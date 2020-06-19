 CREATE TABLE workspaces (
    id SERIAL PRIMARY KEY,
    created_by_user INTEGER REFERENCES users (id),
    name VARCHAR(50) NOT NULL,
    description VARCHAR,
    workspace_data jsonb
);

INSERT INTO workspaces (id, created_by_user, name, description, workspace_data)
    VALUES (1, 1, 'UI Altered', 'A workspace dedicated to UI improvements',
            '{
              "project_ids": [1, 2, 3, 4, 5],
              "project_users": [
                {
                  "id": 1,
                  "name": "Smoke Test",
                  "serviceId": 0,
                  "projectIds": [1, 2, 3, 4, 5],
                  "providerId": null
                }
              ]
            }
          ')