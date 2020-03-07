export interface Project {
    id: number;
    name: string;
    ownerId?: number;
    ownerName?: string;
    url: string;
    avatarUrl?: string | null;
}
