CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    service_id INT NOT NULL,
    provider_id VARCHAR(10) NOT NULL
);