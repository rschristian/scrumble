import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';

const WorkspacesMetrics: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div class="main-content">metrics metrics</div>
            </div>
        </div>
    );
};

export default WorkspacesMetrics;
