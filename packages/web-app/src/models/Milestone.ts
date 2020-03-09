export enum GLMilestoneStatus {
    open = 'open',
    closed = 'closed',
}

export interface GLMilestone {
    // Id is for all projects on a GL instance.
    id: number;
    // Iid, or internal ID, is the id that is unique to a project
    iid: number;
    project_id: number;
    title: string;
    description?: string;
    status: GLMilestoneStatus;
    start_date: Date;
    due_date: Date;
}
