pub mod auth_service;
pub mod user_service;

use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Tracer};

pub fn service_tracer() -> Tracer {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("service"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });
    tracer
}
