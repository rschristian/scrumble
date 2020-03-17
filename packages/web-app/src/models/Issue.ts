export interface Issue {
    iid?: number; // Optional only because the frontend won't know what the ID of a new issue might be.
    title: string;
    description?: string;
    storyPoints?: string[]; // this is linked to labels which is an array of strings
    projectId: number;
}
