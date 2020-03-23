import { FunctionalComponent, h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import { IssueFilter } from 'components/Filter/issues';
import { Issue } from 'models/Issue';
import { fetchWorkspaceIssues } from 'services/api/issues';
import { observer } from 'services/mobx';

const IssuesList: FunctionalComponent = observer(() => {
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [issueFilter, setIssueFilter] = useState<string>('open');
    const [currentPageNum, setCurrentPageNum] = useState<number>(0);
    const [currentProjectId, setCurrentProjectId] = useState<number>(0);
    const [areMoreIssues, setAreMoreIssues] = useState<boolean>(true);

    const updateIssueFilter = (filterFor: string): void => {
        setCurrentPageNum(0);
        setCurrentProjectId(0);
        setIssuesArray([]);
        setIssueFilter(filterFor);
    };

    useEffect(() => {
        fetchMore();
    }, [issueFilter]);

    const fetchMore = (): void => {
        fetchWorkspaceIssues(23, issueFilter, currentProjectId, currentPageNum).then((issuePagination) => {
            setIssuesArray(issuesArray.concat(issuePagination.issues));
            const projectId = issuePagination.nextResource.projectId;
            const pageNumber = issuePagination.nextResource.pageNumber;

            if (projectId == 0 && pageNumber == 0) {
                setAreMoreIssues(false);
            } else {
                setCurrentProjectId(projectId);
                setCurrentPageNum(pageNumber);
            }
        });
    };

    return (
        <div>
            <IssueFilter setFilter={updateIssueFilter} />
            <div class="w-full">
                <button class={`btn-create ${areMoreIssues ? 'block' : 'hidden'}`} onClick={fetchMore}>
                    Fetch more
                </button>
            </div>
            <div class="rounded bg-white overflow-hidden shadow-lg">
                {issuesArray.map((issue, index) => {
                    return <IssueCard key={index} issue={issue} />;
                })}
            </div>
        </div>
    );
});

export default IssuesList;
