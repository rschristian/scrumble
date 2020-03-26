import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { IssueStatus } from 'models/Issue';

interface IProps {
    setFilter: (filterFor: string) => void;
}

// This is a rather ugly way to extend an enum.
type filterStatusEnum = IssueStatus | string;
const filterStatusEnum = {
    ...IssueStatus,
    unplanned: 'unplanned',
    all: 'all',
};

export const IssueFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<filterStatusEnum>(filterStatusEnum.open);

    const updateFilter = (filterStatus: string): void => {
        props.setFilter(filterStatus.toString());
        setFilterStatus(filterStatus);
    };

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    className={`btn-filter ${filterStatus === filterStatusEnum.all ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(filterStatusEnum.all)}
                >
                    All
                </button>
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.open ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(filterStatusEnum.open)}
                >
                    Open
                </button>
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.closed ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(filterStatusEnum.closed)}
                >
                    Closed
                </button>
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.unplanned ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(filterStatusEnum.unplanned)}
                >
                    Unplanned
                </button>
            </div>
        </div>
    );
};
