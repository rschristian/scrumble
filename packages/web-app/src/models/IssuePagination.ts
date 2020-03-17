import { Issue } from './Issue';
import { PageData } from './PageData';

export interface IssuePagination {
    issues: Issue[];
    pageData: PageData;
}
