use crate::db::{repository_tracer, Conn};
use crate::models::user_options::UserOptions;
use crate::schema::user_options;

use diesel::prelude::*;
use rustracing_jaeger::Span;

pub fn get_options(user_id: i32, conn: Conn, span: &Span) -> Option<UserOptions> {
    let _span = repository_tracer()
        .span("SQL SELECT User Options")
        .child_of(span)
        .start();

    user_options::table
        .filter(user_options::user_id.eq(user_id))
        .get_result::<UserOptions>(&*conn)
        .map_err(|err| eprintln!("get_user_options: {}", err))
        .ok()
}
