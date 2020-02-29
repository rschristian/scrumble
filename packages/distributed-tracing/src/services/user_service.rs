use crate::db::{email_repository, user_options_repository, Conn};
use crate::models::email::EmailJson;
use crate::models::user_options::UserOptions;

use rustracing_jaeger::{Span, Tracer};

pub fn get_options(user_id: i32, conn: Conn, tracer: &Tracer, span: &Span) -> Option<UserOptions> {
    let span = tracer
        .span("User_Options::service_layer")
        .child_of(span)
        .start();
    user_options_repository::get_options(user_id, conn, tracer, &span)
}

pub fn get_inbox(user_id: i32, conn: Conn, tracer: &Tracer, span: &Span) -> Option<Vec<EmailJson>> {
    let span = tracer
        .span("User_Inbox::service_layer")
        .child_of(span)
        .start();
    let email_list = email_repository::get_emails(user_id, conn, tracer, &span).unwrap();

    if !email_list.is_empty() {
        Some(
            email_list
                .into_iter()
                .map(|email| email.to_email_response(tracer, &span))
                .collect(),
        )
    } else {
        None
    }
}
