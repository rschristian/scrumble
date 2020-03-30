 CREATE TABLE workspaces (
    id SERIAL PRIMARY KEY,
    created_by_user INTEGER REFERENCES users (id),
    name VARCHAR(50) NOT NULL,
    description VARCHAR,
    project_ids jsonb
);