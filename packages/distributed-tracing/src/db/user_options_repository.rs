use crate::db::Conn;
use crate::models::user_options::UserOptions;
use crate::schema::user_options;

use diesel::prelude::*;
use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Span, Tracer};

pub fn get_options(user_id: i32, conn: Conn, span: &Span) -> Option<UserOptions> {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("postgresql"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });

    let _span = tracer.span("SQL Get User's Options").child_of(span).start();

    user_options::table
        .filter(user_options::user_id.eq(user_id))
        .get_result::<UserOptions>(&*conn)
        .map_err(|err| eprintln!("get_user_options: {}", err))
        .ok()
}
