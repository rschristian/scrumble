import { ComponentChild, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getCurrentUrl, Link } from 'preact-router';

import { SideBar } from 'components/Navigation/SideBar';
import { sprints, workspaces } from 'data';
import SprintBoard from './board';
import SprintEdit from './edit';
import SprintIssues from './issues';
import SprintMetrics from './metrics';
import { sideNavItems } from './util';

interface IProps {
    workspaceId: number;
    sprintId: number;
}

const Sprint: FunctionalComponent<IProps> = (props: IProps) => {
    const [workspaceName, setWorkspaceName] = useState<string>('');
    const [sprintName, setSprintName] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<string>('');
    const [form, setForm] = useState<ComponentChild>(null);

    useEffect(() => {
        for (const workspace of workspaces) {
            if (workspace.id == props.workspaceId) {
                setWorkspaceName(workspace.name);
            }
        }
        for (const sprint of sprints) {
            if (sprint.id == props.sprintId) {
                setSprintName(sprint.name);
            }
        }
        const currentUrl = getCurrentUrl();
        if (currentUrl.includes('board')) {
            setCurrentPage('Board');
            setForm(<SprintBoard />);
        } else if (currentUrl.includes('metrics')) {
            setCurrentPage('Metrics');
            setForm(<SprintMetrics />);
        } else if (currentUrl.includes('edit')) {
            setCurrentPage('Edit');
            setForm(<SprintEdit />);
        } else {
            setCurrentPage('Issues');
            setForm(<SprintIssues />);
        }
    }, [getCurrentUrl()]);

    return (
        <div class="w-screen block">
            <div class="flex">
                <SideBar items={sideNavItems} />
                <div class="main-content">
                    <h1 className="user-path">
                        <Link href="/">Workspaces</Link> &gt; {workspaceName} &gt; Sprints &gt; {sprintName} &gt;{' '}
                        {currentPage}
                    </h1>
                    {form}
                </div>
            </div>
        </div>
    );
};

export default Sprint;
