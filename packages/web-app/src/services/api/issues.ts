import { apiService } from 'ts-api-toolkit';

import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';

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
export const createIssue = async (projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .post(`issues/${projectId}/createIssue`, issue)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

// GitLab API: PUT /projects/:id/issues/:issue_iid
export const editIssue = async (projectId: number, issue: Issue): Promise<void | string> => {
    return await apiService
        .put(`issues/${projectId}/editIssue/`, issue)
        .then(() => {
            return;
        })
        .catch(({ response }) => {
            if (response.data !== '') return response.data.message;
            return 'Unknown error while updating sprint status';
        });
};

export const fetchWorkspaceIssues = async (
    workspaceId: number,
    filter: string,
    projectId: number,
    page: number,
): Promise<IssuePagination> => {
    const args = { filter, projectId, page };
    return await apiService.query(`/workspace/${workspaceId}/issues`, { params: args }).then((response) => {
        console.log(response);
        return response.data;
    });
};

export const fetchWorkspaceIssuesCached = async (): Promise<Issue[]> => {
    const workspaceId = 8;
    return await apiService.get(`/workspace/${workspaceId}/issues/cached`).then((response) => {
        console.log(response);
        return response.data;
    });
};
