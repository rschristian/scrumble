import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';
import IssueFilter from 'components/Filter/issues';
import IssueListItem from 'components/ListItems/issue';
import { SprintListItem } from 'components/ListItems/sprint';
import SprintFilter from 'components/Filter/sprints';
import { issues, sprints } from 'data';

const WorkspacesIssues: FunctionalComponent = () => {
    return (
        <div class="page">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Backlog</h1>
                    <div class="flex h-screen">
                        <div class="w-11/12 md:w-1/2">
                            <div className="create-bar">
                                <h1 className="page-heading">Issues</h1>
                            </div>
                            <div class="mr-4">
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
                        <div class="border-l border-gray-300 h-full w-1/2 hidden md:block">
                            <div className="create-bar">
                                <h1 className="ml-4 page-heading">Sprints</h1>
                            </div>
                            <div class="ml-4">
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
                </div>
            </div>
        </div>
    );
};

export default WorkspacesIssues;
