use crate::db::Conn;
use crate::models::user::{InsertableUser, User};
use crate::schema::users;

use diesel::prelude::*;
use diesel::result::{DatabaseErrorKind, Error};
use rustracing_jaeger::{Span, Tracer};

pub enum UserCreationError {
    DuplicatedEmail,
}

impl From<Error> for UserCreationError {
    fn from(err: Error) -> UserCreationError {
        if let Error::DatabaseError(DatabaseErrorKind::UniqueViolation, info) = &err {
            if let Some("unique_email") = info.constraint_name() {
                return UserCreationError::DuplicatedEmail;
            }
        }
        panic!("Error creating user: {:?}", err)
    }
}

pub fn register(
    user: InsertableUser,
    conn: Conn,
    tracer: &Tracer,
    span: &Span,
) -> Result<User, UserCreationError> {
    let _span = tracer
        .span("Register::repository_layer")
        .child_of(span)
        .start();

    diesel::insert_into(users::table)
        .values(user)
        .get_result::<User>(&*conn)
        .map_err(Into::into)
}

pub fn login(email: String, conn: Conn, tracer: &Tracer, span: &Span) -> Option<User> {
    let _span = tracer
        .span("Login::repository_layer")
        .child_of(span)
        .start();

    users::table
        .filter(users::email.eq(email))
        .get_result::<User>(&*conn)
        .ok()
}
