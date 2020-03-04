import edit from 'assets/icons/edit.png';
import team from 'assets/icons/team.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';
import metrics from 'assets/icons/metrics.png';
import presentation from 'assets/icons/presentation.png';
import { SideBarItem } from 'models/SideBarItem';

export const sideNavItems: SideBarItem[] = [
    {
        label: 'Issues Board',
        icon: kanbanBoard,
        path: '/',
    },
    {
        label: 'Daily Stand-up',
        icon: team,
        path: '/dailyStandUp',
    },
    {
        label: 'Metrics',
        icon: metrics,
        path: '/metrics',
    },
    {
        label: 'Show and Tell',
        icon: presentation,
        path: '/showAndTell',
    },
    {
        label: 'Edit',
        icon: edit,
        path: '/edit',
    },
];
