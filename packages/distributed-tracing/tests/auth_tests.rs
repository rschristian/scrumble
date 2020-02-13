//! Test registration and login

mod common;

use common::{EMAIL, FIRST_NAME, LAST_NAME, PASSWORD};

use rocket::http::{ContentType, Status};
use rocket::local::LocalResponse;

#[test]
/// Try registering a new user
fn test_register() {
    let client = common::test_client();
    let response = &mut client
        .post("/api/v1/users/register")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"first_name": FIRST_NAME, "last_name": LAST_NAME, "email": EMAIL, "password": PASSWORD}}))
        .dispatch();

    let status = response.status();
    // If user was already created we should get an UnprocessableEntity or Ok otherwise.
    //
    // As tests are ran in an independent order `login()` probably has already created smoketest user.
    // And so we gracefully handle "user already exists" error here.
    match status {
        Status::Ok => check_auth_response(response),
        Status::UnprocessableEntity => check_user_validation_errors(response),
        _ => panic!("Got status: {}", status),
    }
}

#[test]
/// Registration with the same email must fail
fn test_register_with_duplicated_email() {
    let client = common::test_client();
    // First register an account
    common::register(
        client,
        FIRST_NAME,
        LAST_NAME,
        "smoketest2@example.com",
        PASSWORD,
    );

    // Then try to register a second account with the same details
    let response = &mut client
        .post("/api/v1/users/register")
        .header(ContentType::JSON)
        .body(json_string!({
            "user": {
                "first_name": FIRST_NAME,
                "last_name": LAST_NAME,
                "email": "smoketest2@example.com",
                "password": PASSWORD,
            },
        }))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = common::response_json_value(response);
    let error = value
        .get("errors")
        .and_then(|errors| errors.get("email"))
        .and_then(|errors| errors.get(0))
        .and_then(|error| error.as_str());

    assert_eq!(error, Some("has already been taken"))
}

#[test]
/// Registration with an invalid email format must fail
fn test_register_with_invalid_email_format() {
    let client = common::test_client();
    let response = &mut client
        .post("/api/v1/users/register")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"first_name": FIRST_NAME, "last_name": LAST_NAME, "email": "smoketest", "password": PASSWORD}}))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = common::response_json_value(response);
    let error = value
        .get("errors")
        .and_then(|errors| errors.get("email"))
        .and_then(|errors| errors.get(0))
        .and_then(|error| error.as_str());

    assert_eq!(error, Some("email"))
}

#[test]
/// Registration with an invalid password format must fail
fn test_register_with_invalid_password_format() {
    let client = common::test_client();
    let response = &mut client
        .post("/api/v1/users/register")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"first_name": FIRST_NAME, "last_name": LAST_NAME, "email": EMAIL, "password": "pw"}}))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = common::response_json_value(response);
    let error = value
        .get("errors")
        .and_then(|errors| errors.get("password"))
        .and_then(|errors| errors.get(0))
        .and_then(|error| error.as_str());

    assert_eq!(error, Some("length"))
}

#[test]
/// Try logging in, and assure response token is valid
fn test_login() {
    let client = common::test_client();
    let response = &mut client
        .post("/api/v1/users/login")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"email": EMAIL, "password": PASSWORD}}))
        .dispatch();

    check_auth_response(response)
}

#[test]
/// Login with wrong password must fail.
fn test_incorrect_login() {
    let client = common::test_client();
    let response = &mut client
        .post("/api/v1/users/login")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"email": EMAIL, "password": "foobarfoobar"}}))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = common::response_json_value(response);
    let login_error = value
        .get("errors")
        .expect("must have a 'errors' field")
        .get("email or password")
        .expect("must have 'email or password' errors")
        .get(0)
        .expect("must have non empty 'email or password' errors")
        .as_str();

    assert_eq!(login_error, Some("is invalid"));
}

#[test]
/// Login with an invalid email format must fail
fn test_login_with_invalid_email_format() {
    let client = common::test_client();
    let response = &mut client
        .post("/api/v1/users/login")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"email": "smoketest", "password": PASSWORD}}))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = common::response_json_value(response);
    println!("{}", value);
    let error = value
        .get("errors")
        .and_then(|errors| errors.get("email"))
        .and_then(|errors| errors.get(0))
        .and_then(|error| error.as_str());

    assert_eq!(error, Some("email"))
}

#[test]
/// Login with an invalid password format must fail
fn test_login_with_invalid_password_format() {
    let client = common::test_client();
    let response = &mut client
        .post("/api/v1/users/login")
        .header(ContentType::JSON)
        .body(json_string!({"user": {"email": EMAIL, "password": "pw"}}))
        .dispatch();

    assert_eq!(response.status(), Status::UnprocessableEntity);

    let value = common::response_json_value(response);
    println!("{}", value);
    let error = value
        .get("errors")
        .and_then(|errors| errors.get("password"))
        .and_then(|errors| errors.get(0))
        .and_then(|error| error.as_str());

    assert_eq!(error, Some("length"))
}

// Utility

/// Assert that body contains "user" response with expected fields.
fn check_auth_response(response: &mut LocalResponse) {
    let value = common::response_json_value(response);
    let user = value.get("user").expect("must have a 'user' field");

    assert_eq!(user.get("email").expect("must have a 'email' field"), EMAIL);
    assert_eq!(
        user.get("first_name")
            .expect("must have a 'first_name' field"),
        FIRST_NAME
    );
    assert_eq!(
        user.get("last_name")
            .expect("must have a 'last_name' field"),
        LAST_NAME
    );
    assert!(user.get("token").is_some());
}

/// Catches the registration test, if the email has already been used in the database
fn check_user_validation_errors(response: &mut LocalResponse) {
    let value = common::response_json_value(response);
    let email_error = value
        .get("errors")
        .expect("must have a 'errors' field")
        .get("email")
        .expect("must have 'email' errors")
        .get(0)
        .expect("must have non-empty 'email' errors")
        .as_str();

    assert_eq!(Some("has already been taken"), email_error)
}
