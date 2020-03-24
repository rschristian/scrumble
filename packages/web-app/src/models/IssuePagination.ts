import { Issue } from './Issue';

export interface ProjectPageData {
    projectId: number;
    pageNumber: number;
    pageSize: number;
}

export interface IssuePagination {
    issues: Issue[];
    nextResource: ProjectPageData;
}
