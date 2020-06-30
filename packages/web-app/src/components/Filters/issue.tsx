import { Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { IssueFilterStatus } from 'models/IssueFilterStatus';

interface IProps {
    setFilter: (filterStatus: string) => void;
}

const IssueFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<IssueFilterStatus>(IssueFilterStatus.unplanned);

    useEffect(() => {
        props.setFilter(filterStatus.toString());
    }, [filterStatus, props]);

    return (
        <Fragment>
            <button
                class={`btn-filter ${filterStatus === IssueFilterStatus.unplanned && 'btn-filter-active'}`}
                onClick={(): void => setFilterStatus(IssueFilterStatus.unplanned)}
            >
                Unplanned
            </button>
            <button
                class={`btn-filter ${filterStatus === IssueFilterStatus.open && 'btn-filter-active'}`}
                onClick={(): void => setFilterStatus(IssueFilterStatus.open)}
            >
                Open
            </button>
            <button
                class={`btn-filter ${filterStatus === IssueFilterStatus.closed && 'btn-filter-active'}`}
                onClick={(): void => setFilterStatus(IssueFilterStatus.closed)}
            >
                Closed
            </button>
            <button
                class={`btn-filter ${filterStatus === IssueFilterStatus.all && 'btn-filter-active'}`}
                onClick={(): void => setFilterStatus(IssueFilterStatus.all)}
            >
                All
            </button>
        </Fragment>
    );
};

export default IssueFilter;
