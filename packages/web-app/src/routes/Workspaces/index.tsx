import { FunctionalComponent, h } from 'preact';
import Sprints from 'components/Sprints';
import WorkspaceNav from 'components/Navigation/WorkspaceNav';

interface IProps {
    id: number;
}

const WorkspaceView: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div className="flex">
            <WorkspaceNav />
            <div className="main-content">
                <Sprints />
            </div>
        </div>
    );
};

export default WorkspaceView;
