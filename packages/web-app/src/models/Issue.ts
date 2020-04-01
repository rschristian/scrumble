import { Sprint } from './Sprint';

export enum IssueStatus {
    open = 'opened',
    closed = 'closed',
}

export interface Issue {
    iid?: number; // Optional only because the frontend won't know what the ID of a new issue might be.
    title: string;
    description?: string;
    storyPoint?: number;
    status: IssueStatus;
    labels?: string[];
    projectId: number;
    sprint?: Sprint;
}
