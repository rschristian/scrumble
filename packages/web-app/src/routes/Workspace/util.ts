import edit from 'assets/icons/edit.png';
import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import sprinter from 'assets/icons/sprinter.png';
import { SideBarItem } from 'models/SideBarItem';

export const sideNavItems: SideBarItem[] = [
    // {
    //     label: 'Sprints',
    //     icon: sprinter,
    //     path: '/',
    // },
    {
        label: 'Backlog Planning',
        icon: list,
        path: '/backlogPlanning',
    },
    {
        label: 'Sprint Planning',
        icon: sprinter,
        path: '/sprintPlanning',
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
