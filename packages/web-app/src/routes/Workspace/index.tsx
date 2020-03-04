import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { BreadCrumbs } from 'components/BreadCrumbs';
import { SideBar } from 'components/Core/SideBar';
import { workspaces } from 'data';
import WorkspaceEdit from './edit';
import WorkspaceMetrics from './metrics';
import { sideNavItems } from './util';
import BacklogPlanning from './backlogPlanning';
import SprintPlanning from './sprintPlannning';

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
    const [workspaceName, setWorkspaceName] = useState<string>('');
    const [currentPageTitle, setCurrentPageTitle] = useState<string>('');
    const [subPage, setSubPage] = useState<ComponentChild>(null);

    useEffect(() => {
        for (const workspace of workspaces) {
            if (workspace.id == props.workspaceId) setWorkspaceName(workspace.name);
        }

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
                <SideBar items={sideNavItems} />
                <div class="main-content">
                    <BreadCrumbs
                        workspaceId={props.workspaceId}
                        workspaceName={workspaceName}
                        currentPage={currentPageTitle}
                    />
                    {subPage}
                </div>
            </div>
        </div>
    );
};

export default Workspace;
