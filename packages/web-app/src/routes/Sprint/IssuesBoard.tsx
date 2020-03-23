import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { IssueBoardCard } from 'components/Cards/issue';
import { issues } from 'data';

const IssuesBoard: FunctionalComponent = () => {
    // TODO This is horrendous, but an easy way to split up test data. Delete all once real data is set up
    const [open, setOpen] = useState<ComponentChild[]>([]);
    const [inProgress, setInProgress] = useState<ComponentChild[]>([]);
    const [forReview, setForReview] = useState<ComponentChild[]>([]);
    const [closed, setClosed] = useState<ComponentChild[]>([]);

    useEffect(() => {
        issues.map((issue, index) => {
            if (index < 10) {
                setOpen((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        iid={issue.iid}
                        id={issue.id}
                        state={issue.state}
                        title={issue.title}
                        description={issue.description}
                        storyPoint={issue.storyPoint}
                        projectId={issue.projectId}
                    />,
                ]);
            } else if (index < 20) {
                setInProgress((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        iid={issue.iid}
                        id={issue.id}
                        state={issue.state}
                        title={issue.title}
                        description={issue.description}
                        storyPoint={issue.storyPoint}
                        projectId={issue.projectId}
                    />,
                ]);
            } else if (index < 30) {
                setForReview((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        iid={issue.iid}
                        id={issue.id}
                        state={issue.state}
                        title={issue.title}
                        description={issue.description}
                        storyPoint={issue.storyPoint}
                        projectId={issue.projectId}
                    />,
                ]);
            } else {
                setClosed((oldValues) => [
                    ...oldValues,
                    <IssueBoardCard
                        key={index}
                        iid={issue.iid}
                        id={issue.id}
                        state={issue.state}
                        title={issue.title}
                        description={issue.description}
                        storyPoint={issue.storyPoint}
                        projectId={issue.projectId}
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
                    <div class="issue-list-title-holder bg-yellow-300">
                        <h2 class="issue-list-title">For Review</h2>
                    </div>
                    {forReview}
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
