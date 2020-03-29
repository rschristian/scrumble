import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';

import { BreadCrumbs } from 'components/BreadCrumbs';
import { SideBar } from 'components/Core/SideBar';

import WorkspaceMetrics from './metrics';
import WorkspaceEdit from './edit';
import { sideNavItems } from './util';
import BacklogPlanning from './backlogPlanning';
import SprintPlanning from './sprintPlannning';
import { UserLocationStoreContext } from 'stores';

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

const Workspace: FunctionalComponent<IProps> = (props: IProps) => {
    const userLocationStore = useContext(UserLocationStoreContext);
    const [currentPageTitle, setCurrentPageTitle] = useState('');
    const [subPage, setSubPage] = useState<ComponentChild>(null);

    useEffect(() => {
        switch (props.subPage) {
            case SubPage.backlogPlanning:
                setCurrentPageTitle('Backlog Planning');
                setSubPage(<BacklogPlanning />);
                break;
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

export default Workspace;
