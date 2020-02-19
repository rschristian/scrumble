import { FunctionalComponent, h } from 'preact';

const IssuesBoard: FunctionalComponent = () => {
    const sprints = [
        {
            id: 1,
            name: 'Skyfall',
            description: 'Insert insightful and creative description of a sprint here',
        },
        {
            id: 2,
            name: 'Quantum of Solace',
            description: 'Insert insightful and creative description of a sprint here',
        },
        {
            id: 1,
            name: 'Spectre',
            description: 'Insert insightful and creative description of a sprint here',
        },
    ];

    return (
        <div className="main-content">
            <h1 className="user-path">CUBRIC > Sprints</h1>
            <div className="create-bar">
                <h1 className="page-heading">Issues Board</h1>
                <button className="btn-create my-auto">New Issue</button>
            </div>
        </div>
    );
};

export default IssuesBoard;
