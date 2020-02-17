import { FunctionalComponent, h } from 'preact';

import IssueListItem from 'components/Issues/ListItem';
import IssueFilter from 'components/Issues/Filter';

const Issues: FunctionalComponent = () => {
    const issues = [
        {
            id: 1,
            name: 'As a user, I want to be edit a workspace so they can be altered after creation',
            description: 'An insightful description of a user story',
            storyPoint: 1,
        },
        {
            id: 2,
            name: 'As a scrum master, I want to view a burn down chart for a sprint so that I can view velocity',
            description: 'An insightful description of a user story',
            storyPoint: 3,
        },
        {
            id: 1,
            name: 'As a scrum master, I want to view the current number of closed tasks for a sprint',
            description: 'An insightful description of a user story',
            storyPoint: 1,
        },
    ];

    return (
        <div className="main-content">
            <h1 className="user-path">CUBRIC > Sprints > Skyfall</h1>
            <div className="create-bar">
                <h1 className="page-heading">Issues</h1>
                <button className="btn-create my-auto">New Issue</button>
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
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Issues;
