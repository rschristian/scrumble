export enum SprintStatus {
    active = 'active',
    closed = 'closed',
}

export interface Sprint {
    id: number; // Id is for all projects on a GL instance.
    projectId: number;
    title: string;
    description?: string;
    status: SprintStatus;
    startDate: Date;
    dueDate: Date;
    totalStoryPoint: number;
    totalNumberOfIssues: number;
}
