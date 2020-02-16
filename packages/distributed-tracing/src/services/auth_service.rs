use crate::db::{
    auth_repository::{self, UserCreationError},
    Conn,
};
use crate::models::user::{InsertableUser, User, UserCredentials};

use crypto::scrypt::{self, ScryptParams};
use rustracing_jaeger::{Span, Tracer};

pub fn register(
    mut user: InsertableUser,
    conn: Conn,
    tracer: &Tracer,
    span: Span,
) -> Result<User, UserCreationError> {
    let span = tracer
        .span("Register::service_layer")
        .child_of(&span)
        .start();

    user.password = scrypt::scrypt_simple(user.password.as_ref(), &ScryptParams::new(14, 8, 1))
        .expect("hash error");
    auth_repository::register(user, conn, tracer, span)
}

pub fn login(
    credentials: UserCredentials,
    conn: Conn,
    tracer: &Tracer,
    span: Span,
) -> Option<User> {
    let span = tracer.span("Login::service_layer").child_of(&span).start();

    let user = auth_repository::login(credentials.email, conn, tracer, span);
    match user {
        Some(user) => {
            let password_matches =
                scrypt::scrypt_check(credentials.password.as_ref(), user.hashed_password.as_ref())
                    .map_err(|err| eprintln!("login_user: scrypt_check: {}", err))
                    .ok()?;

            if password_matches {
                Some(user)
            } else {
                None
            }
        }
        None => None,
    }
}
