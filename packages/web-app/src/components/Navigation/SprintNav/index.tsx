import { FunctionalComponent, h } from 'preact';

import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import presentation from 'assets/icons/presentation.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';

import Sidebar from 'components/Navigation/Sidebar';
import { SideBarItem } from 'models/SideBarItem';

const SprintNav: FunctionalComponent = () => {
    const menuItems: SideBarItem[] = [
        {
            label: 'Issues',
            icon: list,
            path: '#',
        },
        {
            label: 'Board',
            icon: kanbanBoard,
            path: '#',
        },
        {
            label: 'Metrics',
            icon: metrics,
            path: 'sprint/1/metrics',
        },
        {
            label: 'Show n Tell',
            icon: presentation,
            path: '#',
        },
        {
            label: 'Edit',
            icon: edit,
            path: '#',
        },
    ];

    return <Sidebar items={menuItems} />;
};

export default SprintNav;
