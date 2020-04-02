import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import sprinter from 'assets/icons/sprinter.png';
import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import { BreadCrumbs } from 'components/BreadCrumbs';
import { SideBar, SideBarLink } from 'components/Core/SideBar';

import SprintPlanning from './sprintPlannning';
import WorkspaceMetrics from './metrics';
import WorkspaceEdit from './edit';
import { useStore } from 'stores';

interface IProps {
    workspaceId: number;
    subPage?: SubPage;
}

enum SubPage {
    sprintPlanning = 'sprintPlanning',
    backlogPlanning = 'backlogPlanning',
    metrics = 'metrics',
    edit = 'edit',
}

const WorkspaceContainer: FunctionalComponent<IProps> = (props: IProps) => {
    const userLocationStore = useStore().userLocationStore;

    const [currentPageTitle, setCurrentPageTitle] = useState('');
    const [subPage, setSubPage] = useState<ComponentChild>(null);

    useEffect(() => {
        switch (props.subPage) {
            case SubPage.metrics:
                setCurrentPageTitle('Metrics');
                setSubPage(<WorkspaceMetrics />);
                break;
            case SubPage.edit:
                setCurrentPageTitle('Edit');
                setSubPage(<WorkspaceEdit />);
                break;
            default:
                setCurrentPageTitle('Sprint Planning');
                setSubPage(<SprintPlanning />);
                break;
        }
    }, [props.workspaceId, props.subPage]);

    return (
        <div class="page">
            <div class="flex">
                <SideBar links={sideNavItems} />
                <div class="main-content">
                    <BreadCrumbs
                        workspaceId={props.workspaceId}
                        workspaceName={userLocationStore.currentWorkspace.name}
                        currentPage={currentPageTitle}
                    />
                    {subPage}
                </div>
            </div>
        </div>
    );
};

const sideNavItems: SideBarLink[] = [
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

export default WorkspaceContainer;
