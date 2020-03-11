export interface Issue {
    id?: number;
    title: string;
    description: string | null;
    storyPoint: number | null;
    projectId: string;
}
