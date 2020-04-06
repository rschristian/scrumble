import { User } from "./User";

export interface Workspace {
    id?: number;
    name: string;
    description: string;
    projectIds: number[];
    users: User[];
}
