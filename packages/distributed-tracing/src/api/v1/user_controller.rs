use crate::api::{auth_middleware::Auth, v1::api_tracer};
use crate::db::Conn;
use crate::errors::Errors;
use crate::services::user_service;

use rocket_contrib::json::JsonValue;
use rustracing::tag::Tag;

#[get("/user/options")]
pub fn get_user_options(auth: Option<Auth>, conn: Conn) -> Result<JsonValue, Errors> {
    let parent_span = api_tracer()
        .span("HTTP GET /user/options")
        .tag(Tag::new("component", "net/http"))
        .tag(Tag::new("http.method", "GET"))
        .tag(Tag::new("http.url", "/user/options"))
        .tag(Tag::new("span.kind", "server"))
        .start();

    let user_id = auth.map(|auth| auth.id).unwrap_or(-1);
    user_service::get_options(user_id, conn, &parent_span)
        .map(|user_options| json!({ "user_options": user_options.to_user_options_response(&parent_span) }))
        .ok_or_else(|| Errors::new(&[("options for that user", "don't exist")]))
}

#[get("/user/inbox")]
pub fn get_user_inbox(auth: Option<Auth>, conn: Conn) -> Result<JsonValue, Errors> {
    let parent_span = api_tracer()
        .span("HTTP GET /user/inbox")
        .tag(Tag::new("component", "net/http"))
        .tag(Tag::new("http.method", "GET"))
        .tag(Tag::new("http.url", "/user/inbox"))
        .tag(Tag::new("span.kind", "server"))
        .start();

    let user_id = auth.map(|auth| auth.id).unwrap_or(-1);
    user_service::get_inbox(user_id, conn, &parent_span)
        .map(|emails| json!({ "inbox": emails }))
        .ok_or_else(|| Errors::new(&[("inbox for user", "doesn't exist")]))
}
