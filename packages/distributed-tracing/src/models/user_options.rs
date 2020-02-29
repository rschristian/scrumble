use rustracing_jaeger::{Span, Tracer};
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
    pub fn to_user_options_response(&self, tracer: &Tracer, span: &Span) -> UserOptionsResponse {
        let _span = tracer
            .span("User_Options::to_user_options_response")
            .child_of(span)
            .start();

        UserOptionsResponse {
            emails_per_page: &self.emails_per_page,
        }
    }
}
