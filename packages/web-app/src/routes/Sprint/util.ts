import edit from 'assets/icons/edit.png';
import team from 'assets/icons/team.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';
import metrics from 'assets/icons/metrics.png';
import presentation from 'assets/icons/presentation.png';
import { SideBarLink } from 'models/SideBarLink';

export const sideNavItems: SideBarLink[] = [
    {
        label: 'Daily Stand-up',
        icon: team,
        path: '/',
    },
    {
        label: 'Issues Board',
        icon: kanbanBoard,
        path: '/issuesBoard',
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
