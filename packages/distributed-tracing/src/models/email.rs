use crate::config::DATE_FORMAT;

use chrono::{DateTime, Utc};
use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Span, Tracer};
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
        let (span_tx, span_rx) = crossbeam_channel::bounded(100);
        let tracer = Tracer::with_sender(AllSampler, span_tx);
        std::thread::spawn(move || {
            let reporter = track_try_unwrap!(JaegerCompactReporter::new("domain"));
            for span in span_rx {
                track_try_unwrap!(reporter.report(&[span]));
            }
        });

        let _span = tracer.span("JSON Serialize Emails").child_of(span).start();

        EmailJson {
            sender: self.sender.clone(),
            content: self.content.clone(),
            datetime: self.datetime.format(DATE_FORMAT).to_string(),
        }
    }
}
