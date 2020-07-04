import { Sprint } from './Sprint';
import { User } from './User';
import { Project } from 'models/Project';

export enum IssueState {
    open = 'opened',
    todo = 'To Do',
    doing = 'Doing',
    closed = 'closed',
}

export interface Issue {
    iid?: number;
    title: string;
    description: string;
    state: IssueState;
    author: User;
    assignee?: User;
    createdAt: Date | string;
    timeSpent?: number;
    storyPoint: number;
    project: Project;
    sprint?: Sprint; // GitLab API, None / Any
}

export function isIssue(result: Issue | string): result is Issue {
    return !!(result as Issue).iid;
}

export function isIssueArray(result: Issue[] | string): result is Issue[] {
    return Array.isArray(result);
}
