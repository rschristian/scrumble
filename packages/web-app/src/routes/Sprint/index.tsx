import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import team from 'assets/icons/team.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';
import presentation from 'assets/icons/presentation.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import { BreadCrumbs } from 'components/BreadCrumbs';
import { SideBar, SideBarLink } from 'components/Core/SideBar';
import { sprints } from 'data';

import DailyStandUp from './dailyStandUp';
import IssuesBoard from './issuesBoard';
import SprintShowAndTell from './showAndTell';
import SprintMetrics from './metrics';
import SprintEdit from './edit';
import { useStore } from 'stores';

interface IProps {
    workspaceId: number;
    sprintId: number;
    subPage?: SubPage;
}

enum SubPage {
    dailyStandUp = 'dailyStandUp',
    issuesBoard = 'issuesBoard',
    metrics = 'metrics',
    showAndTell = 'showAndTell',
    edit = 'edit',
}

const SprintContainer: FunctionalComponent<IProps> = (props: IProps) => {
    const userLocationStore = useStore().userLocationStore;

    const [sprintName, setSprintName] = useState('');
    const [subPageTitle, setSubPageTitle] = useState('');
    const [subPageContent, setSubPageContent] = useState<ComponentChild>(null);

    useEffect(() => {
        for (const sprint of sprints) {
            if (sprint.id == props.sprintId) setSprintName(sprint.title);
        }

        switch (props.subPage) {
            case SubPage.issuesBoard:
                setSubPageTitle('Issues Board');
                setSubPageContent(<IssuesBoard />);
                break;
            case SubPage.metrics:
                setSubPageTitle('Metrics');
                setSubPageContent(<SprintMetrics />);
                break;
            case SubPage.showAndTell:
                setSubPageTitle('Show and Tell');
                setSubPageContent(<SprintShowAndTell />);
                break;
            case SubPage.edit:
                setSubPageTitle('Edit');
                setSubPageContent(<SprintEdit />);
                break;
            default:
                setSubPageTitle('Daily Stand-up');
                setSubPageContent(<DailyStandUp />);
                break;
        }
    }, [props.sprintId, props.workspaceId, props.subPage]);

    return (
        <div class="page">
            <div class="flex">
                <SideBar links={sideNavItems} />
                <div class="main-content">
                    <BreadCrumbs
                        workspaceId={props.workspaceId}
                        workspaceName={userLocationStore.currentWorkspace.name}
                        currentPage={subPageTitle}
                        sprintId={props.sprintId}
                        sprintName={sprintName}
                    />
                    {subPageContent}
                </div>
            </div>
        </div>
    );
};

const sideNavItems: SideBarLink[] = [
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
        label: 'Show and Tell',
        icon: presentation,
        path: '/showAndTell',
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

export default SprintContainer;
