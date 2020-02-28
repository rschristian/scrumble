use crate::db::Conn;
use crate::models::email::Email;
use crate::schema::mailbox_messages;

use diesel::prelude::*;
use rustracing_jaeger::{Span, Tracer};

pub fn get_emails(user_id: i32, conn: Conn, tracer: &Tracer, span: &Span) -> Option<Vec<Email>> {
    let _span = tracer
        .span("User_Emails::repository_layer")
        .child_of(span)
        .start();

    mailbox_messages::table
        .filter(mailbox_messages::mailbox_id.eq(user_id))
        .get_results::<Email>(&*conn)
        .ok()
}
