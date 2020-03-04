pub mod auth_controller;
pub mod user_controller;

use rocket::Route;
use rustracing::sampler::AllSampler;
use rustracing_jaeger::{reporter::JaegerCompactReporter, Tracer};

pub fn api_tracer() -> Tracer {
    let (span_tx, span_rx) = crossbeam_channel::bounded(100);
    let tracer = Tracer::with_sender(AllSampler, span_tx);
    std::thread::spawn(move || {
        let reporter = track_try_unwrap!(JaegerCompactReporter::new("backend"));
        for span in span_rx {
            track_try_unwrap!(reporter.report(&[span]));
        }
    });
    tracer
}

pub fn routes() -> Vec<Route> {
    routes![
        auth_controller::users_login,
        auth_controller::users_register,
        user_controller::get_user_options,
        user_controller::get_user_inbox,
    ]
}
