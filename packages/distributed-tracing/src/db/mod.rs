use rocket_contrib::databases::diesel;

pub mod auth_repository;
pub mod email_repository;
pub mod user_options_repository;

#[database("diesel_postgres_pool")]
pub struct Conn(diesel::PgConnection);
