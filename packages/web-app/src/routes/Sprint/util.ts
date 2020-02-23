import edit from 'assets/icons/edit.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';
import metrics from 'assets/icons/metrics.png';
import presentation from 'assets/icons/presentation.png';
import { SideBarItem } from 'models/SideBarItem';

export const sideNavItems: SideBarItem[] = [
    {
        label: 'Daily Stand-up',
        icon: kanbanBoard,
        path: '/dailystandup',
    },
    {
        label: 'Metrics',
        icon: metrics,
        path: '/metrics',
    },
    {
        label: 'Show and Tell',
        icon: presentation,
        path: '/showandtell',
    },
    {
        label: 'Edit',
        icon: edit,
        path: '/edit',
    },
];
