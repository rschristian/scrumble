export interface Issue {
    id: number;
    name: string;
    description: string | null;
    storyPoint: number | null;
    project: string;
}
