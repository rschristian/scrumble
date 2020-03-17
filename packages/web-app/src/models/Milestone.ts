export interface Milestone {
    // iid?: number; // Optional only because the frontend won't know what the ID of a new issue might be.
    id: number;
    title: string;
    description?: string;
}
