import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { useSelector } from 'react-redux';

import sprinter from 'assets/icons/sprinter.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import BreadCrumbs from 'components/BreadCrumbs';
import SideBar, { SideBarLink } from 'components/Core/SideBar';
import { RootState } from 'stores';

import SprintPlanning from './sprintPlannning';
import WorkspaceMetrics from './metrics';
import WorkspaceEdit from './edit';

const sideNavItems: SideBarLink[] = [
    {
        label: 'Sprint Planning',
        icon: sprinter,
        path: '/',
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
    subPage?: SubPage;
}

enum SubPage {
    sprintPlanning = 'sprintPlanning',
    metrics = 'metrics',
    edit = 'edit',
}

const WorkspaceContainer: FunctionalComponent<IProps> = (props: IProps) => {
    const { currentWorkspace } = useSelector((state: RootState) => state.userLocation);

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
                        workspaceName={currentWorkspace.name}
                        currentPage={currentPageTitle}
                    />
                    {subPage}
                </div>
            </div>
        </div>
    );
};

export default WorkspaceContainer;
