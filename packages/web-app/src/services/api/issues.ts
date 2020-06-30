import apiService from './index';

import { Issue } from 'models/Issue';
import { IssuePagination } from 'models/IssuePagination';
import { Sprint } from 'models/Sprint';

// ----------------------------------------
// Create
// ----------------------------------------

export const apiCreateIssue = async (workspaceId: number, issue: Issue): Promise<Issue | string> => {
    try {
        const { data } = await apiService.post(`/workspace/${workspaceId}/project/${issue.project.id}/issue`, {
            issue,
        });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while creating issue';
    }
};

// ----------------------------------------
// Read
// ----------------------------------------

export const apiFetchIssues = async (
    workspaceId: number,
    projectId: number,
    page: number,
    filter: string,
    searchFor: string,
): Promise<IssuePagination | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/issues`, {
            params: { projectId, page, filter, searchFor },
        });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching workspace issues';
    }
};

export const apiFetchSprintIssues = async (workspaceId: number, sprint: Sprint): Promise<Issue[] | string> => {
    try {
        const { data } = await apiService.query(`/workspace/${workspaceId}/sprint/issues`, {
            params: { projectIdToMilestoneIds: sprint.projectIdToMilestoneIds },
        });
        return data;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while fetching sprint issues';
    }
};

// ----------------------------------------
// Update
// ----------------------------------------

export const apiUpdateIssue = async (workspaceId: number, issue: Issue): Promise<void | string> => {
    try {
        await apiService.put(`/workspace/${workspaceId}/project/${issue.project.id}/issue/${issue.iid}`, { issue });
        return;
    } catch ({ response }) {
        return response.data?.message || 'Unknown error while editing issue';
    }
};

// ----------------------------------------
// Delete
// ----------------------------------------
