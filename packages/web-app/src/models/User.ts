export interface User {
    id: number;
    name: string;
    username: string;
    avatarUrl: string;
    projectIds: number[];
}

export function isUser(result: User | string): result is User {
    return !!(result as User).id;
}
