import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import { IssueFilter } from 'components/Filter/issues';
import { Issue } from 'models/Issue';
import { fetchWorkspaceIssues } from 'services/api/issues';
import { observer } from 'services/mobx';
import { UserLocationStoreContext } from 'stores';

const IssuesList: FunctionalComponent = observer(() => {
    const userLocationStore = useContext(UserLocationStoreContext);

    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [issueFilter, setIssueFilter] = useState<string>('open');
    const [currentPageNum, setCurrentPageNum] = useState<number>(0);
    const [currentProjectId, setCurrentProjectId] = useState<number>(0);
    const [areMoreIssues, setAreMoreIssues] = useState<boolean>(true);
    const [issuesRetrievalErrorMessage, setIssuesRetrievalErrorMessage] = useState('');

    const updateIssueFilter = (filterFor: string): void => {
        setCurrentPageNum(0);
        setCurrentProjectId(0);
        setIssuesArray([]);
        setIssueFilter(filterFor);
    };

    const issueCardList = issuesArray.map((issue, index) => {
        return <IssueCard key={index} issue={issue} />;
    });

    useEffect(() => {
        fetchMore();
    }, [issueFilter, userLocationStore]);

    const fetchMore = (): void => {
        fetchWorkspaceIssues(userLocationStore.currentWorkspace.id, issueFilter, currentProjectId, currentPageNum).then(
            (issuePagination) => {
                // TODO: LAUREN FIX THIS!!
                // if (typeof issues == 'string') setIssuesRetrievalErrorMessage(issues);

                setIssuesArray(issuesArray.concat(issuePagination.issues));
                const projectId = issuePagination.nextResource.projectId;
                const pageNumber = issuePagination.nextResource.pageNumber;

                if (projectId == 0 && pageNumber == 0) {
                    setAreMoreIssues(false);
                } else {
                    setCurrentProjectId(projectId);
                    setCurrentPageNum(pageNumber);
                }
            },
        );
    };

    return (
        <div>
            <IssueFilter setFilter={updateIssueFilter} />
            <div class="w-full">
                <button class={`btn-create ${areMoreIssues ? 'block' : 'hidden'}`} onClick={fetchMore}>
                    Fetch more
                </button>
            </div>
            <div className="rounded bg-white overflow-hidden shadow-lg">
                {issuesRetrievalErrorMessage !== '' ? issuesRetrievalErrorMessage : issueCardList}
            </div>
        </div>
    );
});

export default IssuesList;
