import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { SearchBar } from 'components/SearchBar';

interface IProps {
    setFilter: (filterFor: string) => void;
}

enum FilterStatus {
    open = 'opened',
    closed = 'closed',
    unplanned = 'unplanned',
    all = 'all',
}

export const IssueFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.unplanned);

    const updateFilter = (filterStatus: FilterStatus): void => {
        props.setFilter(filterStatus.toString());
        setFilterStatus(filterStatus);
    };

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    className={`btn-filter ${filterStatus === FilterStatus.all ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.all)}
                >
                    All
                </button>
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.open ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.open)}
                >
                    Open
                </button>
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.closed ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.closed)}
                >
                    Closed
                </button>
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.unplanned ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.unplanned)}
                >
                    Unplanned
                </button>
            </div>
            <SearchBar placeholder="Search by name" />
        </div>
    );
};
