import { Fragment, FunctionalComponent, h } from 'preact';

import { IssueCard } from 'components/Cards/issue';
import { issues } from 'data';

const SprintBoard: FunctionalComponent = () => {
    return (
        <Fragment>
            <div className="create-bar">
                <h1 className="page-heading">Issues Board</h1>
            </div>
            <div className="issue-board">
                {/*<div className="status-col">*/}
                {/*    <div className="issue-list-title-holder bg-purple-300">*/}
                {/*        <h2 className="issue-list-title">Status</h2>*/}
                {/*    </div>*/}
                {/*    <div class="p4 bg-red-500">*/}
                {/*        <h2 className="issue-list-title">Urgent</h2>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="issue-list">
                    <div className="issue-list-title-holder bg-red-300">
                        <h2 className="issue-list-title">Open</h2>
                    </div>
                    {issues.map((issue, index) => {
                        return (
                            <IssueCard
                                key={index}
                                id={issue.id}
                                name={issue.name}
                                description={issue.description}
                                storyPoint={issue.storyPoint}
                                project={issue.project}
                            />
                        );
                    })}
                </div>
                <div className="issue-list border-l border-deep-space-sparkle">
                    <div className="issue-list-title-holder bg-orange-300">
                        <h2 className="issue-list-title">In Progress</h2>
                    </div>
                    {issues.map((issue, index) => {
                        return (
                            <IssueCard
                                key={index}
                                id={issue.id}
                                name={issue.name}
                                description={issue.description}
                                storyPoint={issue.storyPoint}
                                project={issue.project}
                            />
                        );
                    })}
                </div>
                <div className="issue-list border-l border-deep-space-sparkle">
                    <div className="issue-list-title-holder bg-yellow-300">
                        <h2 className="issue-list-title">For Review</h2>
                    </div>
                    {issues.map((issue, index) => {
                        return (
                            <IssueCard
                                key={index}
                                id={issue.id}
                                name={issue.name}
                                description={issue.description}
                                storyPoint={issue.storyPoint}
                                project={issue.project}
                            />
                        );
                    })}
                </div>
                <div className="issue-list border-l border-deep-space-sparkle">
                    <div className="issue-list-title-holder bg-green-300">
                        <h2 className="issue-list-title">Closed</h2>
                    </div>
                    {issues.map((issue, index) => {
                        return (
                            <IssueCard
                                key={index}
                                id={issue.id}
                                name={issue.name}
                                description={issue.description}
                                storyPoint={issue.storyPoint}
                                project={issue.project}
                            />
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

export default SprintBoard;
