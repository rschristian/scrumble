import { User } from './User';

export interface Workspace {
    id: number;
    name: string;
    description: string;
    projectIds: number[];
    users: User[];
}

export function isWorkspace(result: Workspace | string): result is Workspace {
    return !!(result as Workspace).id;
}

export function isWorkspaceArray(result: Workspace[] | string): result is Workspace[] {
    return Array.isArray(result);
}
