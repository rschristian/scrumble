import { FunctionalComponent, h } from 'preact';

import Sidebar from 'components/Navigation/Sidebar';
import { sideNavItems } from 'routes/Workspaces/util';

const WorkspacesEdit: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <Sidebar items={sideNavItems} />
                <div class="main-content">edit edit edit</div>
            </div>
        </div>
    );
};

export default WorkspacesEdit;
