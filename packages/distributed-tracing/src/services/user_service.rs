use crate::db::{email_repository, user_options_repository, Conn};
use crate::models::email::EmailJson;
use crate::models::user_options::UserOptions;

use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Span, Tracer};

pub fn get_options(user_id: i32, conn: Conn, span: &Span) -> Option<UserOptions> {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("service"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });

    let span = tracer.span("GET User Options").child_of(span).start();
    user_options_repository::get_options(user_id, conn, &span)
}

pub fn get_inbox(user_id: i32, conn: Conn, span: &Span) -> Option<Vec<EmailJson>> {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("service"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });

    let span = tracer
        .span("User_Inbox::service_layer")
        .child_of(span)
        .start();
    let email_list = email_repository::get_emails(user_id, conn, &span).unwrap();

    if !email_list.is_empty() {
        Some(
            email_list
                .into_iter()
                .map(|email| email.to_email_response(&span))
                .collect(),
        )
    } else {
        None
    }
}
