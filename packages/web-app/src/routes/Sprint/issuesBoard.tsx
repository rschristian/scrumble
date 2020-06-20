import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import { IssueBoardCardList } from 'components/Cards/issue';
import { Issue, IssueStatus } from 'models/Issue';
import { editIssue } from 'services/api/issues';
import { getSprintIssues } from 'services/api/sprints';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';

const IssuesBoard: FunctionalComponent = () => {
    const { currentWorkspace, currentSprint } = useSelector((state: RootState) => state.userLocation);
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

    const updateIssue = async (issue: Issue): Promise<void> => {
        return await editIssue(currentWorkspace.id, issue).then((error) => {
            if (error) notify.show(error, 'error', 5000, errorColour);
            else {
                updateIssueBoard(issue);
            }
        });
    };

    const fetchIssues = async (): Promise<void> => {
        getSprintIssues(currentWorkspace.id, currentSprint).then((result) => {
            if (typeof result == 'string') {
                notify.show(result, 'error', 5000, errorColour);
            } else {
                setIssuesArray(result as Issue[]);
            }
        });
    };

    useEffect(() => {
        fetchIssues().then();
    }, []);

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
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardCardList
                    status={IssueStatus.todo}
                    headingColour="yellow"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardCardList
                    status={IssueStatus.doing}
                    headingColour="orange"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
                <IssueBoardCardList
                    status={IssueStatus.closed}
                    headingColour="red"
                    issues={issuesArray}
                    updateIssueBoard={updateIssue}
                />
            </div>
        </Fragment>
    );
};

export default IssuesBoard;
