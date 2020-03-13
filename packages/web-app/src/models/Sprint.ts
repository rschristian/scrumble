export enum SprintStatus {
    open = 'open',
    closed = 'closed',
}

export interface Sprint {
    id: number; // Id is for all projects on a GL instance.
    iid: number; // Iid, or internal ID, is the id that is unique to a project
    projectId: number;
    title: string;
    description?: string;
    status: SprintStatus;
    startDate: Date;
    dueDate: Date;
}
