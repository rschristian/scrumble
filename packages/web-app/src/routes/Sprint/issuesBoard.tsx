import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { IssueBoardCard } from 'components/Cards/issue';
import { issues } from 'data';
import { Issue, IssueStatus } from 'models/Issue';

const IssuesBoard: FunctionalComponent = () => {
    // TODO This is horrendous, but an easy way to split up test data. Delete all once real data is set up
    const [open, setOpen] = useState<ComponentChild[]>([]);
    const [inProgress, setInProgress] = useState<ComponentChild[]>([]);
    const [closed, setClosed] = useState<ComponentChild[]>([]);
    const [issuesArray, setIssuesArray] = useState<Issue[]>(issues);

    useEffect(() => {
        issuesArray.map((issue, index) => {
            if (issue.status === IssueStatus.open) {
                setOpen((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        issue={issue}
                    />,
                ]);
            } else if (issue.status === IssueStatus.inProgress) {
                setInProgress((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        issue={issue}
                    />,
                ])
            } else {
                setClosed((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        issue={issue}
                    />,
                ]);
            }
        });
    }, []);

    return (
        <Fragment>
            <div class="create-bar">
                <h1 class="page-heading">Issues Board</h1>
            </div>
            <div class="issue-board">
                <div class="issue-list">
                    <div class="issue-list-title-holder bg-red-300">
                        <h2 class="issue-list-title">Open</h2>
                    </div>
                    {open}
                </div>
                <div class="issue-list border-l border-deep-space-sparkle">
                    <div class="issue-list-title-holder bg-orange-300">
                        <h2 class="issue-list-title">In Progress</h2>
                    </div>
                    {inProgress}
                </div>
                <div class="issue-list border-l border-deep-space-sparkle">
                    <div class="issue-list-title-holder bg-green-300">
                        <h2 class="issue-list-title">Closed</h2>
                    </div>
                    {closed}
                </div>
            </div>
        </Fragment>
    );
};

export default IssuesBoard;
