import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { IssueBoardCard } from 'components/Cards/issue';
import { issues } from 'data';
import { Issue, IssueStatus } from 'models/Issue';
import { editIssue } from 'services/api/issues';
import { useStore } from 'stores';
import { notify } from 'react-notify-toast';
import { errorColour } from 'services/notification/colours';
import { getSprintIssues } from 'services/api/sprints';

const IssuesBoard: FunctionalComponent = () => {

    const userLocationStore = useStore().userLocationStore;
    const [open, setOpen] = useState<ComponentChild[]>([]);
    const [doing, setDoing] = useState<ComponentChild[]>([]);
    const [todo, setTodo] = useState<ComponentChild[]>([]);
    const [closed, setClosed] = useState<ComponentChild[]>([]);
    const [issuesArray, setIssuesArray] = useState<Issue[]>([]);

    const updateIssueBoard = (updatedIssue: Issue): void => {
        const arrayCopy = [...issuesArray];
        setOpen([]);
        setTodo([]);
        setDoing([]);
        setClosed([]);
        issuesArray.forEach((issue: Issue, index) => {
            if(issue.iid === updatedIssue.iid) {
                arrayCopy[index] = updatedIssue;
                setIssuesArray(arrayCopy);
            }
        })
    }

    const updateIssue = async (issue: Issue): Promise<void> => {
        return await editIssue(userLocationStore.currentWorkspace.id, issue).then((error) => {
            if (error) notify.show(error, 'error', 5000, errorColour);
            else {
                updateIssueBoard(issue);
            }
        })
    }

    const fetchIssues = async (): Promise<void> => {
        getSprintIssues(userLocationStore.currentSprint).then((result) => {
            if (typeof result == 'string'){
                notify.show(result, 'error', 5000, errorColour);
            } else {
                setIssuesArray(result as Issue[]);
            }
        })
    }

    useEffect(() => {
        fetchIssues();
    }, []);

    useEffect(() => {
        issuesArray.map((issue, index) => {
            if (issue.status === IssueStatus.open) {
                setOpen((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        issue={issue}
                        updateIssueBoard= {updateIssueBoard}
                    />,
                ]);
            } else if (issue.status === IssueStatus.todo) {
                    setTodo((oldValues) => [
                        ...oldValues,
                        <IssueBoardCard
                            key={index}
                            issue={issue}
                            updateIssueBoard = {updateIssueBoard}
                        />,
                    ])
            } else if (issue.status === IssueStatus.doing) {
                setDoing((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        issue={issue}
                        updateIssueBoard = {updateIssueBoard}
                    />,
                ])
            } else {
                setClosed((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        issue={issue}
                        updateIssueBoard = {updateIssueBoard}
                    />,
                ]);
            }
        });
    }, [issuesArray]);

    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Issues Board</h1>
            </div>
            <div class="issue-board">
                <div class="issue-list">
                    <div class="issue-list-title-holder bg-green-300">
                        <h2 class="issue-list-title">Open</h2>
                    </div>
                    {open}
                </div>
                <div class="issue-list ">
                    <div class="issue-list-title-holder bg-yellow-300">
                        <h2 class="issue-list-title border-l border-deep-space-sparkle">To Do</h2>
                    </div>
                    {todo}
                </div>
                <div class="issue-list">
                    <div class="issue-list-title-holder bg-orange-300">
                        <h2 class="issue-list-title border-l border-deep-space-sparkle">Doing</h2>
                    </div>
                    {doing}
                </div>
                <div class="issue-list">
                    <div class="issue-list-title-holder bg-red-300">
                        <h2 class="issue-list-title border-l border-deep-space-sparkle">Closed</h2>
                    </div>
                    {closed}
                </div>
            </div>
        </Fragment>
    );
};

export default IssuesBoard;
