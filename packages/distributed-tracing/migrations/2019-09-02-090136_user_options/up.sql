CREATE TABLE user_options
(
    user_id              SERIAL PRIMARY KEY,
    emails_per_page      INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO user_options (user_id, emails_per_page)
VALUES (1, 50);