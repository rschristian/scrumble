import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';

const WorkspacesMetrics: FunctionalComponent = () => {
    return (
        <div class="page">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Metrics</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Metrics</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspacesMetrics;
