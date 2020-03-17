export interface User {
    id: number;
    name: string;
    username: string;
    isAdmin: boolean | null; //only admins can see this feild
}
