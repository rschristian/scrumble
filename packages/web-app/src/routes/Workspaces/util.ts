import edit from 'assets/icons/edit.png';
import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import sprinter from 'assets/icons/sprinter.png';
import { SideNavItem } from 'models/SideNavItem';

export const sideNavItems: SideNavItem[] = [
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
