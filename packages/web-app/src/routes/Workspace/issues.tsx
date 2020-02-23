import { Fragment, FunctionalComponent, h } from 'preact';

import { issues, sprints } from 'data';
import { IssueListItem } from 'components/ListItems/issue';
import { IssueFilter } from 'components/Filter/issues';
import { SprintFilter } from 'components/Filter/sprints';
import { SprintListItem } from 'components/ListItems/sprint';

const WorkspaceIssues: FunctionalComponent = () => {
    return (
        <Fragment>
            <div className="flex h-screen">
                <div className="w-11/12 md:w-1/2">
                    <div className="create-bar">
                        <h1 className="page-heading">Issues</h1>
                    </div>
                    <div className="mr-4">
                        <IssueFilter />
                    </div>
                    <div className="mr-4 rounded bg-white shadow-lg">
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
                </div>
                <div className="border-l border-gray-300 h-full w-1/2 hidden md:block">
                    <div className="create-bar">
                        <h1 className="ml-4 page-heading">Sprints</h1>
                    </div>
                    <div className="ml-4">
                        <SprintFilter />
                    </div>
                    <div className="ml-4 rounded bg-white overflow-hidden shadow-lg">
                        {sprints.map((issue, index) => {
                            return (
                                <SprintListItem
                                    key={index}
                                    id={issue.id}
                                    name={issue.name}
                                    description={issue.description}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default WorkspaceIssues;
