import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';

export async function fetchIssues(): Promise<Issue[]> {
    return await apiService
        .get('/issues/all')
        .then(({ data }) => {
            data.forEach((GitlabIssue: any) => {
                GitlabIssue.storyPoints = GitlabIssue.labels.filter(Number)[0];
                GitlabIssue.projectId = GitlabIssue.project_id;
            });
            return data as Issue[];
        })
        .catch(({ response }) => {
            if (response.data !== '') {
                return response.data.message;
            }
            return 'Unknown error';
        });
}

// GitLab API: POST /projects/:id/issues
export const createIssue = async (workspaceId: number, projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .post(`/workspace/${workspaceId}/project/${projectId}/issue`, { issue })
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

// GitLab API: PUT /projects/:id/issues/:issue_iid
export const editIssue = async (
    workspaceId: number,
    projectId: number,
    issueId: number,
    issue: Issue,
): Promise<void | string> => {
    return await apiService
        .put(`/workspace/${workspaceId}/project/${projectId}/issue/${issueId}`, { issue })
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};
