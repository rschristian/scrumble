use crate::api::auth_middleware::Auth;
use crate::config;
use crate::schema::users;

use rustracing_jaeger::{Span, Tracer};
use serde::Serialize;

#[derive(Queryable, Serialize)]
pub struct User {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    #[serde(skip_serializing)]
    pub hashed_password: String,
}

#[derive(Insertable)]
#[table_name = "users"]
pub struct InsertableUser {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    #[column_name = "hashed_password"]
    pub password: String,
}

pub struct UserCredentials {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct UserAuth<'a> {
    email: &'a str,
    first_name: &'a str,
    last_name: &'a str,
    token: String,
}

impl User {
    pub fn to_user_auth(&self, secret: &[u8], tracer: &Tracer, span: &Span) -> UserAuth {
        let _span = tracer
            .span("User_Auth::to_user_auth")
            .child_of(span)
            .start();

        let exp = config::token_expire_time();
        let token = Auth {
            id: self.id,
            email: self.email.clone(),
            exp: exp.timestamp(),
        }
        .token(secret);

        UserAuth {
            email: &self.email,
            first_name: &self.first_name,
            last_name: &self.last_name,
            token,
        }
    }
}
