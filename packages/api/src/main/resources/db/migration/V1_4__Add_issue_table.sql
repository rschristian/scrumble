 CREATE TABLE issues (
    id SERIAL PRIMARY KEY,
    workspace_id INTEGER REFERENCES workspaces (id),
    start_date TIMESTAMP,
    due_date TIMESTAMP
);