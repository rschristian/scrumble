import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';
import { notify } from 'react-notify-toast';

import team from 'assets/icons/team.png';
import kanbanBoard from 'assets/icons/kanbanBoard.png';
import presentation from 'assets/icons/presentation.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import BreadCrumbs from 'components/BreadCrumbs';
import { SideBar, SideBarLink } from 'components/Core/SideBar';
import { apiFetchSprints } from 'services/api/sprints';
import { errorColour } from 'services/notification/colours';
import { RootState } from 'stores';

import DailyStandUp from './dailyStandUp';
import IssuesBoard from './IssuesBoard';
import SprintShowAndTell from './showAndTell';
import SprintMetrics from './metrics';
import SprintEdit from './edit';

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
    const { currentWorkspace, currentSprint } = useSelector((state: RootState) => state.userLocation);

    const [sprintName, setSprintName] = useState('');
    const [subPageTitle, setSubPageTitle] = useState('');
    const [subPageContent, setSubPageContent] = useState<ComponentChild>(null);

    useEffect(() => {
        apiFetchSprints(currentWorkspace.id, 'none').then((result) => {
            if (typeof result === 'string') notify.show(result, 'error', 5000, errorColour);
            else {
                for (const sprint of result) {
                    if (sprint.id == props.sprintId) setSprintName(sprint.title);
                }
            }
        });

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
    }, [props.sprintId, props.workspaceId, props.subPage, currentWorkspace.id]);

    return (
        <div class="page">
            <div class="flex">
                <SideBar links={sideNavItems} />
                <div class="main-content">
                    <BreadCrumbs
                        workspaceId={props.workspaceId}
                        workspaceName={currentWorkspace.name}
                        currentPage={subPageTitle}
                        sprintId={props.sprintId}
                        sprintName={currentSprint.title}
                    />
                    {subPageContent}
                </div>
            </div>
        </div>
    );
};

export default SprintContainer;
