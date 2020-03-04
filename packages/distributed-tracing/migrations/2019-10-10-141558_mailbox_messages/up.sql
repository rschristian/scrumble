CREATE TABLE mailbox_messages
(
    uid                  SERIAL PRIMARY KEY,
    mailbox_id           INTEGER NOT NULL,
    sender               TEXT NOT NULL,
    content              TEXT NOT NULL,
    datetime             TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (mailbox_id) REFERENCES users (id)
);

INSERT INTO mailbox_messages (mailbox_id, sender, content, datetime)
VALUES (1, 'Brittaney Audrey', 'Open-architected human-resource parallelism', '2018-01-06T00:29:05Z'),
       (1, 'Isadora Niche', 'Configurable value-added Graphical User Interface', '2019-03-24T02:09:34Z'),
       (1, 'Ebba Hebburn', 'Horizontal needs-based application', '2019-02-12T11:33:17Z'),
       (1, 'Shoshanna Tasker', 'Profit-focused asynchronous hierarchy', '2019-04-30T14:46:41Z'),
       (1, 'Charmion Bagenal', 'Open-architected discrete open architecture', '2018-05-03T22:47:09Z'),
       (1, 'Chariot Fallens', 'Optimized uniform data-warehouse', '2019-08-11T14:58:22Z'),
       (1, 'Betsy Mongain', 'Configurable system-worthy framework', '2018-03-27T17:26:36Z');
