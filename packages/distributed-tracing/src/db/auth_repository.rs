use crate::db::{repository_tracer, Conn};
use crate::models::user::{InsertableUser, User};
use crate::schema::users;

use diesel::prelude::*;
use diesel::result::{DatabaseErrorKind, Error};
use rustracing_jaeger::Span;

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

pub fn register(user: InsertableUser, conn: Conn, span: &Span) -> Result<User, UserCreationError> {
    let _span = repository_tracer()
        .span("SQL INSERT New User")
        .child_of(span)
        .start();

    diesel::insert_into(users::table)
        .values(user)
        .get_result::<User>(&*conn)
        .map_err(Into::into)
}

pub fn login(email: String, conn: Conn, span: &Span) -> Option<User> {
    let _span = repository_tracer()
        .span("SQL SELECT User")
        .child_of(span)
        .start();

    users::table
        .filter(users::email.eq(email))
        .get_result::<User>(&*conn)
        .ok()
}
