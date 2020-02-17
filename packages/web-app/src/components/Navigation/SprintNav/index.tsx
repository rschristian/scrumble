import { FunctionalComponent, h } from 'preact';

import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import presentation from 'assets/icons/presentation.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';

import Sidebar from 'components/Navigation/Sidebar';

const SprintNav: FunctionalComponent = () => {
    const menuItems = [
        {
            label: 'Issues',
            iconPath: list,
            href: '#',
        },
        {
            label: 'Board',
            iconPath: kanbanBoard,
            href: '#',
        },
        {
            label: 'Metrics',
            iconPath: metrics,
            href: '#',
        },
        {
            label: 'Show n Tell',
            iconPath: presentation,
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

export default SprintNav;
