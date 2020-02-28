use crate::db::Conn;
use crate::models::email::Email;
use crate::schema::mailbox_messages;

use diesel::prelude::*;

pub fn get_emails(user_id: i32, conn: Conn) -> Option<Vec<Email>> {
    mailbox_messages::table
        .filter(mailbox_messages::mailbox_id.eq(user_id))
        .get_results::<Email>(&*conn)
        .ok()
}
