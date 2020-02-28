pub mod auth_controller;
pub mod user_controller;

use rocket::Route;

pub fn routes() -> Vec<Route> {
    routes![
        auth_controller::users_login,
        auth_controller::users_register,
        user_controller::get_user_options,
        user_controller::get_user_inbox,
    ]
}
