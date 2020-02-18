import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';

const WorkspacesSprints: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div class="main-content">sprints sprints</div>
            </div>
        </div>
    );
};

export default WorkspacesSprints;
