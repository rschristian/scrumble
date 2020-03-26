import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { notify } from 'react-notify-toast';

import { error, warning } from 'services/Notification/colours';
import { IssueCard } from 'components/Cards/issue';
import { IssueFilter } from 'components/Filter/issues';
import { Issue, IssueStatus } from 'models/Issue';
import { fetchWorkspaceIssues, searchIssueByTitleDescription } from 'services/api/issues';
import { observer } from 'services/mobx';
import { UserLocationStoreContext } from 'stores';
import { SearchBar } from 'components/SearchBar';

export const IssuesList: FunctionalComponent = observer(() => {
    const userLocationStore = useContext(UserLocationStoreContext);

    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [issueFilter, setIssueFilter] = useState(IssueStatus.open.toString());
    const [currentPageNum, setCurrentPageNum] = useState(0);
    const [currentProjectId, setCurrentProjectId] = useState(0);
    const [areMoreIssues, setAreMoreIssues] = useState(true);
    const [searchFor, setSearchFor] = useState('');

    const updateIssueFilter = (filterFor: string): void => {
        setCurrentPageNum(0);
        setCurrentProjectId(0);
        setIssuesArray([]);
        setIssueFilter(filterFor);
    };

    const handleOnKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
            searchIssueByTitleDescription(23, searchFor, issueFilter).then((res) => {
                if (typeof res === 'string') {
                    notify.show(res, 'error', 5000, error);
                } else if (res.length === 0) {
                    notify.show(
                        `No search results for '${searchFor}' with filter '${issueFilter}'`,
                        'custom',
                        5000,
                        warning,
                    );
                } else {
                    setIssuesArray(res);
                }
            });
        }
    };

    const issueCardList = issuesArray.map((issue, index) => {
        return <IssueCard key={index} issue={issue} />;
    });

    useEffect(() => {
        fetchMore();
    }, [issueFilter]);

    const fetchMore = (): void => {
        fetchWorkspaceIssues(userLocationStore.currentWorkspace.id, issueFilter, currentProjectId, currentPageNum).then(
            (issuePagination) => {
                if (typeof issuePagination == 'string') {
                    notify.show(issuePagination, 'error', 5000, error);
                } else {
                    setIssuesArray(issuesArray.concat(issuePagination.issues));
                    const projectId = issuePagination.nextResource.projectId;
                    const pageNumber = issuePagination.nextResource.pageNumber;

                    if (projectId == 0 && pageNumber == 0) {
                        setAreMoreIssues(false);
                    } else {
                        setCurrentProjectId(projectId);
                        setCurrentPageNum(pageNumber);
                    }
                }
            },
        );
    };

    return (
        <div class="mr-4">
            <IssueFilter setFilter={updateIssueFilter} />
            <SearchBar
                placeholder="Search by title or description"
                handleOnInput={(term: string): void => setSearchFor(term)}
                handleOnKeyDown={handleOnKeyDown}
            />
            <div class="w-full">
                <button class={`btn-create my-4 ${areMoreIssues ? 'block' : 'hidden'}`} onClick={fetchMore}>
                    Fetch More Issues
                </button>
            </div>
            <div className="rounded bg-white overflow-hidden shadow-lg overflow-y-scroll issuesList">
                {issueCardList}
            </div>
        </div>
    );
});
