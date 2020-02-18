import { FunctionalComponent, h } from 'preact';

import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import projects from 'assets/icons/projects.png';
import sprinter from 'assets/icons/sprinter.png';

import Sidebar from 'components/Navigation/Sidebar';

const WorkspaceNav: FunctionalComponent = () => {
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

    return <Sidebar items={menuItems} />;
};

export default WorkspaceNav;
