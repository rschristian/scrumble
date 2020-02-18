import { FunctionalComponent, h } from 'preact';
import WorkspaceNav from 'components/Navigation/WorkspaceNav';
import Metrics from 'routes/Sprints/Metrics';

interface IProps {
    id: number;
}

const WorkspaceView: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div className="flex">
            <WorkspaceNav />
            <div className="main-content">
                <Metrics />
            </div>
            {/*<div className="main-content">*/}
            {/*    <Route path={`${getCurrentUrl}/sprints`} component={Sprints} />*/}
            {/*    <Route path={`${getCurrentUrl}/projects`} component={Sprints} />*/}
            {/*    <Route path={`${getCurrentUrl}/metrics`} component={Metrics} />*/}
            {/*</div>*/}
        </div>
    );
};

export default WorkspaceView;
