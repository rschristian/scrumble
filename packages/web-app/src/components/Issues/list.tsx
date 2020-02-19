import { FunctionalComponent, h } from 'preact';

import IssueListItem from 'components/ListItems/issue';
import IssueFilter from 'components/Issues/Filter';
import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';
import { Issue } from 'models/Issue';

const Issues: FunctionalComponent = () => {
    const issues: Issue[] = [
        {
            id: 1,
            name: 'As a user, I want to be edit a workspace so they can be altered after creation',
            description: 'An insightful description of a user story',
            storyPoint: 1,
            project: 'Phoenix Project',
        },
        {
            id: 2,
            name: 'As a scrum master, I want to view a burn down chart for a sprint so that I can view velocity',
            description: 'An insightful description of a user story',
            storyPoint: 3,
            project: 'Narwhal Project',
        },
        {
            id: 1,
            name: 'As a scrum master, I want to view the current number of closed tasks for a sprint',
            description: 'An insightful description of a user story',
            storyPoint: 1,
            project: 'Unicorn Project',
        },
    ];

    return (
        <div className="w-screen block">
            <div className="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Sprints > Skyfall</h1>
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
                </div>
            </div>
        </div>
    );
};

export default Issues;
