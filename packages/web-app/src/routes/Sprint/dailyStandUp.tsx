import { Fragment, FunctionalComponent, h } from 'preact';

import KanbanBoard from './kanbanBoard';

const DailyStandUp: FunctionalComponent = () => {
    return (
        <Fragment>
            <KanbanBoard />
        </Fragment>
    );
};

export default DailyStandUp;
