use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Span, Tracer};
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
        let (span_tx, span_rx) = crossbeam_channel::bounded(100);
        let tracer = Tracer::with_sender(AllSampler, span_tx);
        std::thread::spawn(move || {
            let reporter = track_try_unwrap!(JaegerCompactReporter::new("domain"));
            for span in span_rx {
                track_try_unwrap!(reporter.report(&[span]));
            }
        });

        let _span = tracer
            .span("JSON Serialize User Options")
            .child_of(span)
            .start();

        UserOptionsResponse {
            emails_per_page: &self.emails_per_page,
        }
    }
}
