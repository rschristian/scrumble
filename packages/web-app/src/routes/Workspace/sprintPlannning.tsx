import { Fragment, FunctionalComponent, h } from 'preact';
import { useState, useEffect, useContext } from 'preact/hooks';

import { IssueCard } from 'components/Cards/issue';
import { SprintCard } from 'components/Cards/sprint';
import { IssueFilter } from 'components/Filter/issues';
import { SprintFilter } from 'components/Filter/sprints';
import { sprints } from 'data';
import { Issue } from 'models/Issue';
import { SprintStatus } from 'models/Sprint';
import { fetchIssues } from 'services/api/issues';
import { UserLocationStoreContext } from 'stores';

const SprintPlanning: FunctionalComponent = () => {
    const userLocationStore = useContext(UserLocationStoreContext);

    const [isSprintView, setIsSprintView] = useState(false);
    const [issueFilter, setIssueFilter] = useState('');
    const [sprintFilter, setSprintFilter] = useState('active');
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);
    const [issuesRetrievalErrorMessage, setIssuesRetrievalErrorMessage] = useState('');

    // TODO: How do we actually want to filter issues?
    const updateIssueFilter = (filterFor: string): void => console.log(filterFor);
    const updateSprintFilter = (filterFor: string): void => setSprintFilter(filterFor);

    useEffect(() => {
        fetchIssues(userLocationStore.currentWorkspace.id).then((issues) => {
            if (typeof issues == 'string') setIssuesRetrievalErrorMessage(issues);
            else setIssuesArray(issues);
        });
    }, [userLocationStore]);

    const issueCardList = issuesArray.map((issue, index) => {
        return <IssueCard key={index} issue={issue} />;
    });

    const sprintCardList = sprints.map((sprint, index) => {
        if (sprintFilter === 'all' || sprint.status.toString() === sprintFilter) {
            return <SprintCard key={index} sprint={sprint} closed={sprint.status === SprintStatus.closed} />;
        }
    });

    return (
        <Fragment>
            <div class="flex">
                <div class={`h-full w-11/12 md:w-1/2 md:block " ${!isSprintView ? '' : 'sm:hidden'}`}>
                    <div class="create-bar">
                        <h1 class="page-heading items-baseline">Backlog</h1>
                        <button
                            onClick={(): void => setIsSprintView(!isSprintView)}
                            class="btn-create md:hidden my-auto mr-4"
                        >
                            Sprints
                        </button>
                    </div>
                    <div class="mr-4">
                        <IssueFilter setFilter={updateIssueFilter} />
                    </div>
                    <div class="mr-4 rounded bg-white shadow-lg">
                        {issuesRetrievalErrorMessage !== '' ? issuesRetrievalErrorMessage : issueCardList}
                    </div>
                </div>
                <div
                    class={`md:border-l border-gray-300 h-full w-11/12 md:w-1/2 md:block " ${
                        isSprintView ? '' : 'sm:hidden'
                    }`}
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
                    <div class="md:ml-4 rounded bg-white overflow-hidden shadow-lg">{sprintCardList}</div>
                </div>
            </div>
        </Fragment>
    );
};

export default SprintPlanning;
