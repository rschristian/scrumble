import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Sprints/util';

const SprintEdit: FunctionalComponent = () => {
    return (
        <div className="w-screen block">
            <div className="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Sprints > Skyfall > Edit</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Edit</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SprintEdit;
