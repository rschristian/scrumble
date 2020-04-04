 CREATE TABLE sprints (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER REFERENCES workspaces (id),
    title VARCHAR(50) NOT NULL,
    description VARCHAR,
    status VARCHAR,
    start_date DATE,
    due_date DATE,
    sprint_data jsonb
);