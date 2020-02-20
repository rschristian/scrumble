import { FunctionalComponent, h } from 'preact';

import { SideBar } from 'components/Navigation/SideBar';
import { sideNavItems } from 'routes/Sprints/util';

const SprintMetrics: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <SideBar items={sideNavItems} />
                <div className="main-content">
                    <h1 className="user-path">CUBRIC > Skyall > Metrics</h1>
                    <div className="create-bar">
                        <h1 className="page-heading">Metrics</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SprintMetrics;
