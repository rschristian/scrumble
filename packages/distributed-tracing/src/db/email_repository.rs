use crate::db::Conn;
use crate::models::email::Email;
use crate::schema::mailbox_messages;

use diesel::prelude::*;
use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Span, Tracer};

pub fn get_emails(user_id: i32, conn: Conn, span: &Span) -> Option<Vec<Email>> {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("postgresql"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });

    let _span = tracer.span("SQL Get Emails").child_of(span).start();

    mailbox_messages::table
        .filter(mailbox_messages::mailbox_id.eq(user_id))
        .get_results::<Email>(&*conn)
        .ok()
}
