import { Issue } from './Issue';
import { ProjectPageData } from './ProjectPageData';

export interface IssuePagination {
    issues: Issue[];
    projectPageData: ProjectPageData;
}
