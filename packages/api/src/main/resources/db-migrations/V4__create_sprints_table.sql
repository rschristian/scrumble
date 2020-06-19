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

INSERT INTO sprints (id, workspace_id, title, description, status, start_date, due_date, sprint_data)
    VALUES (1, 1, 'Initial Sprint', 'Prototyping', 'active', '2020-05-01', '2020-05-08', '{"projects_to_milestones": {"1": 1, "2": 2, "3": 3, "4": 4, "5": 5}}')