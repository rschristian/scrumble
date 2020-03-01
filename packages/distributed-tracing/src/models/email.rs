use crate::config::DATE_FORMAT;
use crate::models::domain_tracer;

use chrono::{DateTime, Utc};
use rustracing_jaeger::Span;
use serde::Serialize;

#[derive(Queryable, Serialize)]
pub struct Email {
    pub uid: i32,
    pub mailbox_id: i32,
    pub sender: String,
    pub content: String,
    pub datetime: DateTime<Utc>,
}

#[derive(Serialize)]
pub struct EmailJson {
    pub sender: String,
    pub content: String,
    pub datetime: String,
}

impl Email {
    pub fn to_email_response(&self, span: &Span) -> EmailJson {
        let _span = domain_tracer()
            .span("Convert email to serializable struct")
            .child_of(span)
            .start();

        EmailJson {
            sender: self.sender.clone(),
            content: self.content.clone(),
            datetime: self.datetime.format(DATE_FORMAT).to_string(),
        }
    }
}
