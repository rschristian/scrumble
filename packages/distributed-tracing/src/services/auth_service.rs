use crate::db::{
    auth_repository::{self, UserCreationError},
    Conn,
};
use crate::models::user::{InsertableUser, User, UserCredentials};
use crate::services::service_tracer;

use crypto::scrypt::{self, ScryptParams};
use rustracing::tag::Tag;
use rustracing_jaeger::Span;

pub fn login(credentials: UserCredentials, conn: Conn, span: &Span) -> Option<User> {
    let span = service_tracer()
        .span("Compare User's Password to Hash")
        .child_of(span)
        .tag(Tag::new("span.kind", "server"))
        .start();

    let user = auth_repository::login(credentials.email, conn, &span);
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

pub fn register(
    mut user: InsertableUser,
    conn: Conn,
    span: &Span,
) -> Result<User, UserCreationError> {
    let span = service_tracer()
        .span("Hash Registrant's Password")
        .child_of(span)
        .tag(Tag::new("span.kind", "server"))
        .start();

    user.password = scrypt::scrypt_simple(user.password.as_ref(), &ScryptParams::new(14, 8, 1))
        .expect("hash error");
    auth_repository::register(user, conn, &span)
}
