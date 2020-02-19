import { FunctionalComponent, h } from 'preact';
import Sidebar from 'components/Navigation/Sidebar';
import Sprints from 'routes/Workspaces/sprints';

import list from 'assets/icons/list.png';
import projects from 'assets/icons/projects.png';
import sprinter from 'assets/icons/sprinter.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';

interface IProps {
    id: number;
}

const WorkspaceView: FunctionalComponent<IProps> = (props: IProps) => {
    const menuItems = [
        {
            label: 'Issues',
            iconPath: list,
            href: '/issues',
        },
        {
            label: 'Projects',
            iconPath: projects,
            href: '/projects',
        },
        {
            label: 'Sprints',
            iconPath: sprinter,
            href: '/sprints',
        },
        {
            label: 'Metrics',
            iconPath: metrics,
            href: '/metrics',
        },
        {
            label: 'Edit',
            iconPath: edit,
            href: '/edit',
        },
    ];

    return (
        <div className="flex">
            <Sidebar items={menuItems} />
            <div className="main-content">
                <Sprints />
            </div>
            {/*<div className="main-content">*/}
            {/*    /!*<Route path={`${getCurrentUrl}/sprints`} component={Sprints} />*!/*/}
            {/*    /!*<Route path={`/workspaces/1/projects`} component={Projects} />*!/*/}
            {/*    <Route path={`/workspace/1/metrics`} component={Metrics} />*/}
            {/*</div>*/}
        </div>
    );
};

export default WorkspaceView;
