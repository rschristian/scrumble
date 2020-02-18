import edit from 'assets/icons/edit.png';
import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import projects from 'assets/icons/projects.png';
import sprinter from 'assets/icons/sprinter.png';
import { SideNav } from 'models/SideNav';

export const sideNavItems: SideNav[] = [
    {
        label: 'Issues',
        icon: list,
        path: '/issues',
    },
    {
        label: 'Projects',
        icon: projects,
        path: '/projects',
    },
    {
        label: 'Sprints',
        icon: sprinter,
        path: '/sprints',
    },
    {
        label: 'Metrics',
        icon: metrics,
        path: '/metrics',
    },
    {
        label: 'Edit',
        icon: edit,
        path: '/edit',
    },
];
