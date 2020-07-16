import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { Issue, IssueState } from 'models/Issue';
import { apiFetchSprintIssues } from 'services/api/issues';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';
import { useLtsWarning } from 'services/notification/hooks';

import IssueBoardColumn from './issueBoardColumn';

const IssuesBoard: FunctionalComponent = () => {
    const { currentWorkspace, currentSprint } = useSelector((state: RootState) => state.userLocation);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);

    useEffect(() => {
        apiFetchSprintIssues(currentWorkspace.id, currentSprint).then((result) => {
            if (typeof result === 'string') {
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
                <IssueBoardColumn
                    status={IssueState.open}
                    headingColour="bg-green-300"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
                <IssueBoardColumn
                    status={IssueState.todo}
                    headingColour="bg-yellow-300"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
                <IssueBoardColumn
                    status={IssueState.doing}
                    headingColour="bg-orange-300"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
                <IssueBoardColumn
                    status={IssueState.closed}
                    headingColour="bg-red-300"
                    issues={issuesArray}
                    updateIssueBoard={useLtsWarning}
                />
            </div>
        </Fragment>
    );
};

export default IssuesBoard;
