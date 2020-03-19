export interface User {
    id: number;
    name: string;
    username: string;
    is_admin?: boolean | null; //only admins can see this feild
}
