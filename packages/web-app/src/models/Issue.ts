export interface Issue {
    iid?: number; // Optional only because the frontend won't know what the ID of a new issue might be.
    title: string;
    description?: string;
    storyPoints?: number;
    projectId: number;
    [x: string]: any; //add an indexer so additional porperties can be added
}
