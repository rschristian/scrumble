use crate::db::{email_repository, user_options_repository, Conn};
use crate::models::{email::EmailJson, user_options::UserOptions};
use crate::services::service_tracer;

use rustracing_jaeger::Span;

pub fn get_options(user_id: i32, conn: Conn, span: &Span) -> Option<UserOptions> {
    let span = service_tracer()
        .span("GET User Options")
        .child_of(span)
        .start();
    user_options_repository::get_options(user_id, conn, &span)
}

pub fn get_inbox(user_id: i32, conn: Conn, span: &Span) -> Option<Vec<EmailJson>> {
    let span = service_tracer()
        .span("GET User Inbox")
        .child_of(span)
        .start();
    let email_list = email_repository::get_emails(user_id, conn, &span).unwrap();

    if !email_list.is_empty() {
        Some(
            email_list
                .into_iter()
                .map(|email| email.to_email_response(&span))
                .collect(),
        )
    } else {
        None
    }
}
