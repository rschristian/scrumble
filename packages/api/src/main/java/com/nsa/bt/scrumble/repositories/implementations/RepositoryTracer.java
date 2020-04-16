package com.nsa.bt.scrumble.repositories.implementations;

import io.jaegertracing.Configuration;
import io.jaegertracing.internal.JaegerTracer;

public class RepositoryTracer {
    public static JaegerTracer getTracer() {
        Configuration.SamplerConfiguration samplerConfig = Configuration.SamplerConfiguration.fromEnv().withType("const").withParam(1);
        Configuration.ReporterConfiguration reporterConfig = Configuration.ReporterConfiguration.fromEnv().withLogSpans(true);
        Configuration config = new Configuration("postgres").withSampler(samplerConfig).withReporter(reporterConfig);
        return config.getTracer();
    }
}
