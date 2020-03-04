CREATE TABLE users
(
    id                   SERIAL  PRIMARY KEY,
    first_name           TEXT    NOT NULL,
    last_name            TEXT    NOT NULL,
    email                TEXT    NOT NULL,
    hashed_password      TEXT    NOT NULL,
    CONSTRAINT unique_email UNIQUE (email)
);

ALTER SEQUENCE users_id_seq RESTART WITH 1;

INSERT INTO users (first_name, last_name, email, hashed_password)
VALUES ('smoke', 'test', 'smoketest@example.com', '$rscrypt$0$DggB$AFR6Zk+AY16xtD9KAor9tw==$k7V3U+gadVDLCWwS41qwd09pt0x/WFDtidUj/S8MhJ4=$');