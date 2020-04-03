export interface Workspace {
    id: number;
    name: string;
    description: string | null;
    projectIds: number[];
}
