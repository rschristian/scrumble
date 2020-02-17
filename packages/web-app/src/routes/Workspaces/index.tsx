import { FunctionalComponent, h } from 'preact';
import { IWorkspaceView } from 'propTypes/IWorkspaceView';
import Sprints from 'components/Sprints';
import WorkspaceNav from 'components/Navigation/WorkspaceNav';

const WorkspaceView: FunctionalComponent<IWorkspaceView> = (props: IWorkspaceView) => {
    return (
        <div class="w-screen">
            <div class="flex">
                <WorkspaceNav />
                <div class="main-content">
                    <Sprints />
                </div>
            </div>
        </div>
    );
};

export default WorkspaceView;
