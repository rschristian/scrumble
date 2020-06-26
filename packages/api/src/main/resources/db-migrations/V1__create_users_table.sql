CREATE TABLE users (
    id           SERIAL      PRIMARY KEY,
    service_id   INT         NOT NULL,
    provider_id  VARCHAR(10) NOT NULL,
    access_token VARCHAR(25)
);

INSERT INTO users (id, service_id, provider_id, access_token)
    VALUES (1, 1, 'gitlab', null);