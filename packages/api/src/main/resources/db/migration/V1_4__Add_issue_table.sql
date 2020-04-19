 CREATE TABLE issues (
    id SERIAL,
    project_id INTEGER,
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    PRIMARY KEY (id, project_id)
);