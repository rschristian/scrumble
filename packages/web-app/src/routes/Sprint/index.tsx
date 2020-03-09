import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { BreadCrumbs } from 'components/BreadCrumbs';
import { SideBar } from 'components/Core/SideBar';
import { sprints, workspaces } from 'data';
import SprintEdit from './edit';
import SprintMetrics from './metrics';
import SprintShowAndTell from './showAndTell';
import { sideNavItems } from './util';
import IssuesBoard from './issuesBoard';
import DailyStandUp from './dailyStandUp';

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

const Sprint: FunctionalComponent<IProps> = (props: IProps) => {
    const [workspaceName, setWorkspaceName] = useState<string>('');
    const [sprintName, setSprintName] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<string>('');
    const [subPage, setSubPage] = useState<ComponentChild>(null);

    useEffect(() => {
        for (const workspace of workspaces) {
            if (workspace.id == props.workspaceId) setWorkspaceName(workspace.name);
        }
        for (const sprint of sprints) {
            if (sprint.id == props.sprintId) setSprintName(sprint.title);
        }

        switch (props.subPage) {
            case SubPage.issuesBoard:
                setCurrentPage('Issues Board');
                setSubPage(<IssuesBoard />);
                break;
            case SubPage.metrics:
                setCurrentPage('Metrics');
                setSubPage(<SprintMetrics />);
                break;
            case SubPage.showAndTell:
                setCurrentPage('Show and Tell');
                setSubPage(<SprintShowAndTell />);
                break;
            case SubPage.edit:
                setCurrentPage('Edit');
                setSubPage(<SprintEdit />);
                break;
            default:
                setCurrentPage('Daily Stand-up');
                setSubPage(<DailyStandUp />);
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
                        workspaceName={workspaceName}
                        currentPage={currentPage}
                        sprintId={props.sprintId}
                        sprintName={sprintName}
                    />
                    {subPage}
                </div>
            </div>
        </div>
    );
};

export default Sprint;
