use crate::db::{repository_tracer, Conn};
use crate::models::email::Email;
use crate::schema::mailbox_messages;

use diesel::prelude::*;
use rustracing::tag::Tag;
use rustracing_jaeger::Span;

pub fn get_emails(user_id: i32, conn: Conn, span: &Span) -> Option<Vec<Email>> {
    let _span = repository_tracer()
        .span("SQL SELECT Emails")
        .child_of(span)
        .tag(Tag::new("peer.service", "postgresql"))
        .tag(Tag::new("span.kind", "client"))
        .tag(Tag::new("sql.query", ""))
        .start();

    mailbox_messages::table
        .filter(mailbox_messages::mailbox_id.eq(user_id))
        .get_results::<Email>(&*conn)
        .ok()
}
