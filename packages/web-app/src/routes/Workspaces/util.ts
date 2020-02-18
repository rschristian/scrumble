import edit from 'assets/icons/edit.png';
import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import sprinter from 'assets/icons/sprinter.png';
import { SideNav } from 'models/SideNav';

export const sideNavItems: SideNav[] = [
    {
        label: 'Sprints',
        icon: sprinter,
        path: '/',
    },
    {
        label: 'Issues',
        icon: list,
        path: '/issues',
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
