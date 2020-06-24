import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { IssueBoardCardList } from 'components/Cards/issue';
import { Issue, IssueStatus } from 'models/Issue';
import { getSprintIssues } from 'services/api/sprints';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { useLtsWarning } from 'services/notification/hooks';

const IssuesBoard: FunctionalComponent = () => {
    const { currentWorkspace, currentSprint } = useSelector((state: RootState) => state.userLocation);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);

    useEffect(() => {
        getSprintIssues(currentWorkspace.id, currentSprint).then((result) => {
            if (typeof result == 'string') {
                notify.show(result, 'error', 5000, errorColour);
            } else {
                setIssuesArray(result as Issue[]);
            }
        });
    }, [currentSprint, currentWorkspace.id]);

    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Issues Board</h1>
            </div>
            <div class="issue-board">
                <IssueBoardCardList
                    status={IssueStatus.open}
                    headingColour="green"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
                <IssueBoardCardList
                    status={IssueStatus.todo}
                    headingColour="yellow"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
                <IssueBoardCardList
                    status={IssueStatus.doing}
                    headingColour="orange"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
                <IssueBoardCardList
                    status={IssueStatus.closed}
                    headingColour="red"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
            </div>
        </Fragment>
    );
};

export default IssuesBoard;
