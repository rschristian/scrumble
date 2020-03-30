import { FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';
import { notify } from 'react-notify-toast';
import { dataGrabber } from 'regressionModel/linearRegression';
import { IssueCard } from 'components/Cards/issue';
import { IssueFilter } from 'components/Filter/issues';
import { SearchBar } from 'components/SearchBar';
import { Issue, IssueStatus } from 'models/Issue';
import { fetchWorkspaceIssues, searchIssueByTitleDescription } from 'services/api/issues';
import { observer } from 'services/mobx';
import { errorColour, warningColour } from 'services/Notification/colours';
import { UserLocationStoreContext } from 'stores';

interface IProps {
    updateIssueData?: (issue: Issue[]) => void;
    updatingIssuesList?: () => void;
    updateIssueList?: boolean;
}

export const IssuesList: FunctionalComponent<IProps> = observer((props: IProps) => {
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

    const handleOnKeyDown = async (e: KeyboardEvent): Promise<void> => {
        if (e.key === 'Enter') {
            const result = await searchIssueByTitleDescription(23, searchFor, issueFilter);

            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else if (result.length === 0) {
                notify.show(
                    `No search results for '${searchFor}' with filter '${issueFilter}'`,
                    'custom',
                    5000,
                    warningColour,
                );
            } else setIssuesArray(result);
        }
    };

    useEffect(() => {
        fetchMore().then();
    }, [issueFilter]);

    useEffect(() => {
        updateIssue();
    }, [props.updateIssueList]);

    const fetchMore = async (): Promise<void> => {
        const issuePagination = await fetchWorkspaceIssues(
            userLocationStore.currentWorkspace.id,
            issueFilter,
            currentProjectId,
            currentPageNum,
        );

        if (typeof issuePagination == 'string') notify.show(issuePagination, 'error', 5000, errorColour);
        else {
            setIssuesArray(issuesArray.concat(issuePagination.issues));
            const projectId = issuePagination.nextResource.projectId;
            const pageNumber = issuePagination.nextResource.pageNumber;

            if (projectId == 0 && pageNumber == 0) setAreMoreIssues(false);
            else {
                setCurrentProjectId(projectId);
                setCurrentPageNum(pageNumber);
            }
        }
    };

    const updateIssue = (): void => {
        fetchWorkspaceIssues(userLocationStore.currentWorkspace.id, issueFilter, currentProjectId, 0).then(
            (issuePagination) => {
                if (typeof issuePagination == 'string') {
                    notify.show(issuePagination, 'error', 5000, errorColour);
                } else {
                    props.updateIssueData !== undefined ? props.updateIssueData(issuePagination.issues) : null;
                    props.updateIssueList !== undefined && true ? props.updatingIssuesList() : null;
                    setIssuesArray(issuePagination.issues);
                }
            },
        );
    };

    const issueCardList = issuesArray.map((issue, index) => {
        return <IssueCard key={index} issue={issue} update={updateIssue} data={dataGrabber(issuesArray)} />;
    });

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
            <div class="rounded bg-white overflow-hidden shadow-lg overflow-y-scroll issuesList">{issueCardList}</div>
        </div>
    );
});
