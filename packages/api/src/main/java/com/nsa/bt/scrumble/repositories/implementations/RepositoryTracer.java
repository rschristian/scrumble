package com.nsa.bt.scrumble.repositories.implementations;

import io.jaegertracing.Configuration;
import io.jaegertracing.internal.JaegerTracer;
import org.springframework.beans.factory.annotation.Value;

public final class RepositoryTracer {
    private RepositoryTracer() {
    }

    @Value("${ryans.hopes.and.dreams}")
    private static String agentHost;

    public static JaegerTracer getTracer() {
        Configuration.SamplerConfiguration samplerConfig = Configuration.SamplerConfiguration.fromEnv().withType("const").withParam(1);
        Configuration.SenderConfiguration senderConfiguration = Configuration.SenderConfiguration.fromEnv().withAgentHost(agentHost).withAgentPort(6831);
        Configuration.ReporterConfiguration reporterConfig = Configuration.ReporterConfiguration.fromEnv().withLogSpans(true).withSender(senderConfiguration);
        Configuration config = new Configuration("postgres").withSampler(samplerConfig).withReporter(reporterConfig);
        return config.getTracer();
    }
}
