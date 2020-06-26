export enum SprintStatus {
    active = 'active',
    closed = 'closed',
}

export interface Sprint {
    id: number;
    title: string;
    description: string;
    status: SprintStatus;
    startDate?: string;
    dueDate?: string;
    totalStoryPoint?: number;
    totalNumberOfIssues?: number;
    projectIdToMilestoneIds: { [key: string]: number };
}

export function isSprint(result: Sprint | string): result is Sprint {
    return !!(result as Sprint).id;
}

export function isSprintArray(result: Sprint[] | string): result is Sprint[] {
    return Array.isArray(result);
}
