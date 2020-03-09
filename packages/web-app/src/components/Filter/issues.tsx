import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { SearchBar } from 'components/SearchBar';

interface IProps {
    setFilter: (filterFor: string) => void;
}

enum FilterStatus {
    open = 'open',
    closed = 'closed',
    unplanned = 'unplanned',
}

export const IssueFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.open);

    const updateFilter = (filterStatus: FilterStatus): void => {
        props.setFilter(filterStatus.toString());
        setFilterStatus(filterStatus);
    };

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    className={`btn-filter ${filterStatus === FilterStatus.open ? 'bg-blue-500' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.open)}
                >
                    Open
                </button>
                <button
                    className={`btn-filter ${filterStatus === FilterStatus.closed ? 'bg-blue-500' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.closed)}
                >
                    Closed
                </button>
                <button
                    className={`btn-filter ${filterStatus === FilterStatus.unplanned ? 'bg-blue-500' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.unplanned)}
                >
                    Unplanned
                </button>
            </div>
            <SearchBar placeholder="Search by name" />
        </div>
    );
};
