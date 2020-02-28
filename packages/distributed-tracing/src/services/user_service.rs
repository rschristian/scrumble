use crate::db::{email_repository, user_options_repository, Conn};
use crate::models::email::EmailJson;
use crate::models::user_options::UserOptions;

pub fn get_options(user_id: i32, conn: Conn) -> Option<UserOptions> {
    user_options_repository::get_options(user_id, conn)
}

pub fn get_inbox(user_id: i32, conn: Conn) -> Option<Vec<EmailJson>> {
    let email_list = email_repository::get_emails(user_id, conn).unwrap();

    //If a Vector of Emails are found, this will convert the data into a form that's suitable
    //to send and present.
    //TODO Fix the logic used. A user could have a null inbox without there being an error.
    // fixing this however requires a more advanced DB schema than what is currently in use.
    if !email_list.is_empty() {
        Some(
            email_list
                .into_iter()
                .map(|email| email.to_email_json())
                .collect(),
        )
    } else {
        None
    }
}
