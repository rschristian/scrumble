import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { IssueBoardCardList } from 'components/Cards/issue';
import { Issue, IssueStatus } from 'models/Issue';
import { apiUpdateIssue, apiFetchSprintIssues } from 'services/api/issues';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';

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
        const result = await apiUpdateIssue(currentWorkspace.id, updatedIssue);
        result ? notify.show(result, 'error', 5000, errorColour) : updateIssueBoard(updatedIssue);
    };

    const fetchIssues = async (): Promise<void> => {
        const result = await apiFetchSprintIssues(currentWorkspace.id, currentSprint);
        typeof result === 'string'
            ? notify.show(result, 'error', 5000, errorColour)
            : setIssuesArray(result as Issue[]);
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
                <IssueBoardCardList
                    status={IssueStatus.open}
                    headingColour="bg-green-300"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardCardList
                    status={IssueStatus.todo}
                    headingColour="bg-yellow-300"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardCardList
                    status={IssueStatus.doing}
                    headingColour="bg-orange-300"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardCardList
                    status={IssueStatus.closed}
                    headingColour="bg-red-300"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
            </div>
        </Fragment>
    );
};

export default IssuesBoard;
