export enum SprintStatus {
    active = 'active',
    closed = 'closed',
}

export interface Sprint {
    id: number;
    title: string;
    description?: string;
    status: SprintStatus;
    startDate: Date;
    dueDate: Date;
    totalStoryPoint: number;
    totalNumberOfIssues: number;
}
