use crate::db::{
    auth_repository::{self, UserCreationError},
    Conn,
};
use crate::models::user::User;

use crypto::scrypt::{self, ScryptParams};

pub fn register(
    first_name: &str,
    last_name: &str,
    email: &str,
    password: &str,
    conn: Conn,
) -> Result<User, UserCreationError> {
    let hashed_password =
        &scrypt::scrypt_simple(password, &ScryptParams::new(14, 8, 1)).expect("hash error");
    auth_repository::register(&first_name, &last_name, &email, &hashed_password, conn)
}

pub fn login(email: &str, password: &str, conn: Conn) -> Option<User> {
    let user = auth_repository::login(&email, conn);
    match user {
        Some(user) => {
            let password_matches = scrypt::scrypt_check(password, user.hashed_password.as_ref())
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
