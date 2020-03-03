use crate::models::domain_tracer;

use rustracing::tag::Tag;
use rustracing_jaeger::Span;
use serde::Serialize;

#[derive(Queryable, Serialize)]
pub struct UserOptions {
    pub user_id: i32,
    pub emails_per_page: i32,
}

#[derive(Serialize)]
pub struct UserOptionsResponse<'a> {
    emails_per_page: &'a i32,
}

impl UserOptions {
    pub fn to_user_options_response(&self, span: &Span) -> UserOptionsResponse {
        let _span = domain_tracer()
            .span("Convert user options to serializable struct")
            .child_of(span)
            .tag(Tag::new("span.kind", "server"))
            .start();

        UserOptionsResponse {
            emails_per_page: &self.emails_per_page,
        }
    }
}
