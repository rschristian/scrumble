import { User } from './User';

export interface Workspace {
    id: number;
    name: string;
    description: string | null;
    createdBy?: User;
}
