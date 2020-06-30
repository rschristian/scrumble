import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { SprintFilterStatus } from 'models/SprintFilterStatus';

interface IProps {
    setFilter: (filterStatus: string) => void;
}

const SprintFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<SprintFilterStatus>(SprintFilterStatus.active);

    useEffect(() => {
        props.setFilter(filterStatus.toString());
    }, [filterStatus, props]);

    return (
        <Fragment>
            <button
                class={`btn-filter ${filterStatus === SprintFilterStatus.active && 'btn-filter-active'}`}
                onClick={(): void => setFilterStatus(SprintFilterStatus.active)}
            >
                Open
            </button>
            <button
                class={`btn-filter ${filterStatus === SprintFilterStatus.closed && 'btn-filter-active'}`}
                onClick={(): void => setFilterStatus(SprintFilterStatus.closed)}
            >
                Closed
            </button>
            <button
                class={`btn-filter ${filterStatus === SprintFilterStatus.all && 'btn-filter-active'}`}
                onClick={(): void => setFilterStatus(SprintFilterStatus.all)}
            >
                All
            </button>
        </Fragment>
    );
};

export default SprintFilter;
