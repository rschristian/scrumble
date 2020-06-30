export interface Project {
    id: number;
    name: string;
    description: string;
    // url: string;
    // avatarUrl?: string;
}

export function isProject(result: Project | string): result is Project {
    return !!(result as Project).id;
}

export function isProjectArray(result: Project[] | string): result is Project[] {
    return Array.isArray(result);
}
