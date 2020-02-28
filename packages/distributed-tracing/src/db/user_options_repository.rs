use crate::db::Conn;
use crate::models::user_options::UserOptions;
use crate::schema::user_options;

use diesel::prelude::*;

pub fn get_options(user_id: i32, conn: Conn) -> Option<UserOptions> {
    user_options::table
        .filter(user_options::user_id.eq(user_id))
        .get_result::<UserOptions>(&*conn)
        .map_err(|err| eprintln!("get_user_options: {}", err))
        .ok()
}
