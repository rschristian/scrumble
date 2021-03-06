import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { Issue, IssueState } from 'models/Issue';
import { apiUpdateIssue, apiFetchSprintIssues } from 'services/api/issues';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';

import IssueBoardColumn from './issueBoardColumn';

const IssuesBoard: FunctionalComponent = () => {
    const { currentSprint, currentWorkspace } = useSelector((state: RootState) => state.userLocation);

    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);

    const updateIssueBoard = (updatedIssue: Issue): void => {
        const arrayCopy = [...issuesArray];
        issuesArray.forEach((issue: Issue, index) => {
            if (issue.iid === updatedIssue.iid) {
                arrayCopy[index] = updatedIssue;
                setIssuesArray(arrayCopy);
            }
        });
    };

    const updateIssue = async (updatedIssue: Issue): Promise<void> => {
        try {
            await apiUpdateIssue(currentWorkspace.id, updatedIssue);
            updateIssueBoard(updatedIssue);
        } catch (error) {
            notify.show(error, 'error', 5000, errorColour);
        }
    };

    const fetchIssues = async (): Promise<void> => {
        try {
            const result = await apiFetchSprintIssues(currentWorkspace.id, currentSprint);
            setIssuesArray(result);
        } catch (error) {
            notify.show(error, 'error', 5000, errorColour);
        }
    };

    useEffect(() => {
        fetchIssues();
        // TODO Look at this. I seem to remember an issue here
    }, []);

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
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardColumn
                    status={IssueState.todo}
                    headingColour="bg-yellow-300"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardColumn
                    status={IssueState.doing}
                    headingColour="bg-orange-300"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardColumn
                    status={IssueState.closed}
                    headingColour="bg-red-300"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
            </div>
        </Fragment>
    );
};

export default IssuesBoard;
