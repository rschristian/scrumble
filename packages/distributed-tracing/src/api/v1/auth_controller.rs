use crate::config::AppState;
use crate::db::{auth_repository::UserCreationError, Conn};
use crate::errors::{Errors, FieldValidator};
use crate::models::user::{InsertableUser, UserCredentials};
use crate::services::auth_service;

use rocket::State;
use rocket_contrib::json::{Json, JsonValue};
use rustracing::sampler::AllSampler;
use rustracing_jaeger::Tracer;
use serde::Deserialize;
use validator::Validate;

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
    let tracer = Tracer::with_sender(AllSampler, state.sender_context.clone());
    let parent_span = tracer.span("Register::handle_request").start();

    let new_user = new_user.into_inner().user;

    let mut extractor = FieldValidator::validate(&new_user);
    let first_name = extractor.extract("first_name", new_user.first_name);
    let last_name = extractor.extract("last_name", new_user.last_name);
    let email = extractor.extract("email", new_user.email);
    let password = extractor.extract("password", new_user.password);
    extractor.check()?;

    let user = InsertableUser {
        first_name,
        last_name,
        email,
        password,
    };

    auth_service::register(user, conn, &tracer, parent_span)
        .map(|user| json!({ "user": user.to_user_auth(&state.secret) }))
        .map_err(|error| {
            let _field = match error {
                UserCreationError::DuplicatedEmail => "email",
            };
            Errors::new(&[(_field, "has already been taken")])
        })
}

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
    let tracer = Tracer::with_sender(AllSampler, state.sender_context.clone());
    let parent_span = tracer.span("Login::handle_request").start();

    let user = user.into_inner().user;

    let mut extractor = FieldValidator::validate(&user);
    let email = extractor.extract("email", user.email);
    let password = extractor.extract("password", user.password);
    extractor.check()?;

    let credentials = UserCredentials {
        email,
        password,
    };

    auth_service::login(credentials, conn, &tracer, parent_span)
        .map(|user| json!({ "user": user.to_user_auth(&state.secret) }))
        .ok_or_else(|| Errors::new(&[("email or password", "is invalid")]))
}
