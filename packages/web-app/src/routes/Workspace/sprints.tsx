import { Fragment, FunctionalComponent, h } from 'preact';

import SearchBar from 'components/SearchBar';
import { SprintListItem } from 'components/ListItems/sprint';
import { sprints } from 'data';

const WorkspaceSprints: FunctionalComponent = () => {
    return (
        <Fragment>
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
        </Fragment>
    );
};

export default WorkspaceSprints;
