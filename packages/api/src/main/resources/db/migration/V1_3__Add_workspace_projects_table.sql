 CREATE TABLE workspace_projects (
    workspace_id INTEGER REFERENCES workspaces (id),
    project_id INTEGER NOT NULL
);