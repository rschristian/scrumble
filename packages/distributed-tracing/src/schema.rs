table! {
    mailbox_messages (uid) {
        uid -> Int4,
        mailbox_id -> Int4,
        sender -> Text,
        content -> Text,
        datetime -> Timestamptz,
    }
}

table! {
    user_options (user_id) {
        user_id -> Int4,
        emails_per_page -> Int4,
    }
}

table! {
    users (id) {
        id -> Int4,
        first_name -> Text,
        last_name -> Text,
        email -> Text,
        hashed_password -> Text,
    }
}

joinable!(mailbox_messages -> users (mailbox_id));
joinable!(user_options -> users (user_id));

allow_tables_to_appear_in_same_query!(mailbox_messages, user_options, users,);
