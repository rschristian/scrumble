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
            href: '#',
        },
        {
            label: 'Projects',
            iconPath: projects,
            href: '#',
        },
        {
            label: 'Sprints',
            iconPath: sprinter,
            href: '#',
        },
        {
            label: 'Metrics',
            iconPath: metrics,
            href: '#',
        },
        {
            label: 'Edit',
            iconPath: edit,
            href: '#',
        },
    ];

    return <Sidebar items={menuItems} />;
};

export default WorkspaceNav;
