export enum SprintStatus {
    active = 'active',
    closed = 'closed',
}

export interface Sprint {
    id: number;
    title: string;
    description?: string;
    status: SprintStatus;
    startDate: string;
    dueDate: string;
    totalStoryPoint?: number;
    totalNumberOfIssues?: number;
}
