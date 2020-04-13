import { Sprint } from './Sprint';
import { User } from './User';

export enum IssueStatus {
    open = 'Opened',
    todo = 'To Do', // default label for GitLab issue board
    doing = 'Doing', // default label for GitLab issue board
    closed = 'Closed',
}

export interface Issue {
    iid?: number; // Optional only because the frontend won't know what the ID of a new issue might be.
    title: string;
    description?: string;
    storyPoint?: number;
    status: IssueStatus | string;
    labels?: string[];
    projectId: number;
    projectName: string;
    timeSpent?: number;
    sprint?: Sprint;
    author: User;
    assignee?: User;
    createdAt: Date | string;
}
