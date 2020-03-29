import { User } from './user';

export interface Workspace {
    id: number;
    name: string;
    description: string | null;
    createdBy?: User;
}
