pub mod auth_repository;
pub mod email_repository;
pub mod user_options_repository;

use rocket_contrib::databases::diesel;
use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Tracer};

#[database("diesel_postgres_pool")]
pub struct Conn(diesel::PgConnection);

pub fn repository_tracer() -> Tracer {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("postgresql"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });
    tracer
}
