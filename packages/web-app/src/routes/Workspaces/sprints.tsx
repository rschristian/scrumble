import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';

const WorkspacesSprints: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Sprints</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Sprints</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspacesSprints;
