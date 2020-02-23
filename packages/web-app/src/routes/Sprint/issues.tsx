import { Fragment, FunctionalComponent, h } from 'preact';

import { IssueListItem } from 'components/ListItems/issue';
import { IssueFilter } from 'components/Filter/issues';
import { issues } from 'data';

const SprintIssues: FunctionalComponent = () => {
    return (
        <Fragment>
            <div className="create-bar">
                <h1 className="page-heading">Issues</h1>
                <button className="btn-create my-auto">
                    <a href="/sprint/1/metrics">New Issue</a>
                </button>
            </div>
            <IssueFilter />
            <div className="rounded bg-white overflow-hidden shadow-lg">
                {issues.map((issue, index) => {
                    return (
                        <IssueListItem
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
        </Fragment>
    );
};

export default SprintIssues;
