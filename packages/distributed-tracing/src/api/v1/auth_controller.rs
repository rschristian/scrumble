use crate::api::v1::api_tracer;
use crate::config::AppState;
use crate::db::{auth_repository::UserCreationError, Conn};
use crate::errors::{Errors, FieldValidator};
use crate::models::user::{InsertableUser, UserCredentials};
use crate::services::auth_service;

use rocket::State;
use rocket_contrib::json::{Json, JsonValue};
use rustracing::tag::Tag;
use serde::Deserialize;
use validator::Validate;

#[derive(Deserialize)]
pub struct LoginUser {
    user: LoginUserData,
}

#[derive(Deserialize, Validate)]
struct LoginUserData {
    #[validate(email)]
    email: Option<String>,
    #[validate(length(min = 8))]
    password: Option<String>,
}

#[post("/users/login", format = "json", data = "<user>")]
pub fn users_login(
    user: Json<LoginUser>,
    conn: Conn,
    state: State<AppState>,
) -> Result<JsonValue, Errors> {
    let mut span = api_tracer()
        .span("HTTP POST /users/login")
        .tag(Tag::new("component", "net/http"))
        .tag(Tag::new("http.method", "POST"))
        .tag(Tag::new("http.url", "/users/login"))
        .tag(Tag::new("span.kind", "server"))
        .start();

    let user = user.into_inner().user;

    let mut extractor = FieldValidator::validate(&user);
    let email = extractor.extract("email", user.email);
    let password = extractor.extract("password", user.password);
    extractor.check(&mut span)?;

    auth_service::login(UserCredentials { email, password }, conn, &span)
        .map(|user| json!({ "user": user.to_user_auth_response(&state.secret, &span) }))
        .ok_or_else(|| {
            span.set_tag(|| Tag::new("error", "true"));
            span.log(|log| {
                log.error().message("Email or password is invalid");
            });
            Errors::new(&[("email or password", "is invalid")])
        })
}

#[derive(Deserialize)]
pub struct RegistrationUser {
    user: RegistrationUserData,
}

#[derive(Deserialize, Validate)]
struct RegistrationUserData {
    first_name: Option<String>,
    last_name: Option<String>,
    #[validate(email)]
    email: Option<String>,
    #[validate(length(min = 8))]
    password: Option<String>,
}

#[post("/users/register", format = "json", data = "<new_user>")]
pub fn users_register(
    new_user: Json<RegistrationUser>,
    conn: Conn,
    state: State<AppState>,
) -> Result<JsonValue, Errors> {
    let mut span = api_tracer()
        .span("HTTP POST /users/register")
        .tag(Tag::new("component", "net/http"))
        .tag(Tag::new("http.method", "POST"))
        .tag(Tag::new("http.url", "/users/register"))
        .tag(Tag::new("span.kind", "server"))
        .start();

    let new_user = new_user.into_inner().user;

    let mut extractor = FieldValidator::validate(&new_user);
    let first_name = extractor.extract("first_name", new_user.first_name);
    let last_name = extractor.extract("last_name", new_user.last_name);
    let email = extractor.extract("email", new_user.email);
    let password = extractor.extract("password", new_user.password);
    extractor.check(&mut span)?;

    auth_service::register(
        InsertableUser {
            first_name,
            last_name,
            email,
            password,
        },
        conn,
        &span,
    )
    .map(|user| json!({ "user": user.to_user_auth_response(&state.secret, &span) }))
    .map_err(|error| {
        let _field = match error {
            UserCreationError::DuplicatedEmail => "email",
        };
        span.log(|log| {
            log.error().message(format!("{} has already been taken", _field));
        });
        Errors::new(&[(_field, "has already been taken")])
    })
}
