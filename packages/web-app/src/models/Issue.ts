import { Sprint } from './Sprint';

export interface Issue {
    iid?: number; // Optional only because the frontend won't know what the ID of a new issue might be.
    id: number;
    title: string;
    description?: string;
    storyPoint?: number;
    state: string;
    labels?: string[];
    projectId: number;
    milestone?: Sprint;
}
