export enum SprintStatus {
    open = 'open',
    closed = 'closed',
}

export interface Sprint {
    // Id is for all projects on a GL instance.
    id: number;
    // Iid, or internal ID, is the id that is unique to a project
    iid: number;
    project_id: number;
    title: string;
    description?: string;
    status: SprintStatus;
    start_date: Date;
    due_date: Date;
}
