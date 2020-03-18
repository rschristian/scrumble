export interface User {
    id: number;
    sub?: number;
    name: string;
    nickname?: string;
    username: string;
    isAdmin?: boolean | null; //only admins can see this feild
}
