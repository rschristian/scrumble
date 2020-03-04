import edit from 'assets/icons/edit.png';
import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import sprinter from 'assets/icons/sprinter.png';
import { SideBarLink } from 'models/SideBarLink';

export const sideNavItems: SideBarLink[] = [
    {
        label: 'Sprint Planning',
        icon: sprinter,
        path: '/',
    },
    {
        label: 'Backlog Planning',
        icon: list,
        path: '/backlogPlanning',
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
