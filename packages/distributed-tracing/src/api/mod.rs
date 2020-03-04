pub mod auth_middleware;
pub mod v1;

use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Tracer};

pub fn auth_middleware_tracer() -> Tracer {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("auth"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });
    tracer
}
