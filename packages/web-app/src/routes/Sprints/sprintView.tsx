import { FunctionalComponent, h } from 'preact';

import Issues from 'components/Issues/list';
import Sidebar from 'components/Navigation/Sidebar';

import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import presentation from 'assets/icons/presentation.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';

const SprintView: FunctionalComponent = () => {
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
            href: 'sprint/1/metrics',
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

    return (
        <div class="w-screen block">
            <div class="flex">
                <Sidebar items={menuItems} />
                <div class="main-content">
                    <Issues />
                </div>
            </div>
        </div>
    );
};

export default SprintView;
