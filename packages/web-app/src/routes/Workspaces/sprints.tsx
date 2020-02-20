import { FunctionalComponent, h } from 'preact';

import SearchBar from 'components/SearchBar';
import { SprintListItem } from 'components/ListItems/sprint';
import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from './util';
import { Sprint } from 'models/Sprint';

const WorkspaceSprints: FunctionalComponent = () => {
    const sprints: Sprint[] = [
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
        <div className="page">
            <div className="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Sprints</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Sprints</h1>
                        <button className="btn-create my-auto">New Sprint</button>
                    </div>
                    <SearchBar placeholder="Search by name" />
                    <div className="rounded bg-white overflow-hidden shadow-lg">
                        {sprints.map((sprint, index) => {
                            return (
                                <SprintListItem
                                    key={index}
                                    id={sprint.id}
                                    name={sprint.name}
                                    description={sprint.description}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceSprints;
