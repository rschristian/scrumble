import { FunctionalComponent, h } from 'preact';
import Sprints from 'components/Sprints';
import WorkspaceNav from 'components/Navigation/WorkspaceNav';

interface IProps {
    id: number;
}

const WorkspaceView: FunctionalComponent<IProps> = (props: IProps) => {
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
