import { FunctionalComponent, h } from 'preact';

import IssueListItem from 'components/ListItems/issue';
import IssueFilter from 'components/Issues/Filter';
import { SideBar } from 'components/Navigation/SideBar';
import { issues } from 'data';
import { sideNavItems } from 'routes/Sprints/util';

const SprintIssues: FunctionalComponent = () => {
    return (
        <div className="w-screen block">
            <div className="flex">
                <SideBar items={sideNavItems} />
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

export default SprintIssues;
