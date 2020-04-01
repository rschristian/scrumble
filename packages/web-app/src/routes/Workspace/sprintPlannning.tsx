import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { notify } from 'react-notify-toast';

import { IssueCard } from 'components/Cards/issue';
import { SprintCard } from 'components/Cards/sprint';
import { filterStatusEnum, IssueFilter } from 'components/Filter/issues';
import { SprintFilter } from 'components/Filter/sprints';
import { sprints } from 'data';
import { Issue, IssueStatus } from 'models/Issue';
import { SprintStatus } from 'models/Sprint';
import { fetchWorkspaceIssues } from 'services/api/issues';
import { errorColour } from 'services/Notification/colours';
import { useStore } from 'stores';

const SprintPlanning: FunctionalComponent = () => {
    const userLocationStore = useStore().userLocationStore;

    const [isSprintView, setIsSprintView] = useState(false);

    const [issueFilter, setIssueFilter] = useState(IssueStatus.open.toString());
    const [issueFilterTerm, setIssueFilterTerm] = useState('');
    const [sprintFilter, setSprintFilter] = useState(SprintStatus.active.toString());

    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(0);
    const [currentProjectId, setCurrentProjectId] = useState(0);

    useEffect(() => {
        userLocationStore.setActiveSideBarItem(0);
    }, [userLocationStore]);

    const updateIssueFilter = (filterFor: string): void => {
        setCurrentPageNumber(0);
        setCurrentProjectId(0);
        setIssuesArray([]);
        if (Object.values(filterStatusEnum).includes(filterFor)) setIssueFilter(filterFor);
        else setIssueFilterTerm(filterFor);
    };

    const updateSprintFilter = (filterFor: string): void => setSprintFilter(filterFor);

    const fetchIssues = (): void => {
        fetchWorkspaceIssues(
            userLocationStore.currentWorkspace.id,
            currentProjectId,
            currentPageNumber,
            issueFilter,
            issueFilterTerm,
        ).then((result) => {
            if (typeof result == 'string') notify.show(result, 'error', 5000, errorColour);
            else if (result.nextResource.pageNumber !== 0) {
                setIssuesArray((oldValues) => oldValues.concat(result.issues));
                setCurrentPageNumber(result.nextResource.pageNumber);
                setCurrentProjectId(result.nextResource.projectId);
            }
        });
    };

    useEffect(() => {
        fetchIssues();
        // TODO This is a completely legitimate warning, but I don't know how to fix it correctly. Help?
    }, [issueFilter, issueFilterTerm]);

    const scrollCheck = (e: HTMLDivElement): void => {
        const bottom = e.scrollHeight - e.scrollTop === e.clientHeight;
        if (bottom) fetchIssues();
    };

    return (
        <Fragment>
            <div class="flex">
                <div class={`w-11/12 md:w-1/2 md:block " ${!isSprintView ? '' : 'sm:hidden'}`}>
                    <div class="create-bar">
                        <h1 class="page-heading items-baseline">Backlog</h1>
                        <button
                            onClick={(): void => setIsSprintView(!isSprintView)}
                            class="btn-create md:hidden my-auto mr-4"
                        >
                            Sprints
                        </button>
                    </div>
                    <div class="md:mr-4">
                        <IssueFilter setFilter={updateIssueFilter} />
                    </div>
                    <div
                        class="md:mr-4 rounded bg-white overflow-hidden shadow-lg overflow-y-scroll issuesList"
                        onScroll={(e): void => scrollCheck(e.target as HTMLDivElement)}
                    >
                        {issuesArray.map((issue, index) => {
                            // console.log(`Issue State: ${issue.state.toString()} Issue Filter: ${issueFilter}`);
                            // if (issueFilter === 'all' || issue.state.toString() === issueFilter) {
                            return <IssueCard key={index} issue={issue} refresh={fetchIssues} />;
                            // }
                        })}
                    </div>
                </div>
                <div
                    class={`md:border-l border-gray-300 w-11/12 md:w-1/2 md:block " ${isSprintView ? '' : 'sm:hidden'}`}
                >
                    <div class="create-bar">
                        <h1 class="md:ml-4 page-heading">Sprints</h1>
                        <button
                            onClick={(): void => setIsSprintView(!isSprintView)}
                            class="btn-create md:hidden my-auto mr-4"
                        >
                            Backlog
                        </button>
                    </div>
                    <div class="md:ml-4">
                        <SprintFilter setFilter={updateSprintFilter} />
                    </div>
                    <div class="md:ml-4 rounded bg-white overflow-hidden shadow-lg">
                        {sprints.map((sprint, index) => {
                            if (sprintFilter === 'all' || sprint.status.toString() === sprintFilter) {
                                return (
                                    <SprintCard
                                        key={index}
                                        sprint={sprint}
                                        closed={sprint.status === SprintStatus.closed}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default SprintPlanning;
