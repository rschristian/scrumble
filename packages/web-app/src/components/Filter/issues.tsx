import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { SearchBar } from 'components/SearchBar';

enum FilterStatus {
    open,
    closed,
    unplanned,
}

export const IssueFilter: FunctionalComponent = () => {
    const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.open);

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    className={`btn-filter ${filterStatus === FilterStatus.open ? 'bg-blue-500' : ''}`}
                    onClick={(): void => setFilterStatus(FilterStatus.open)}
                >
                    Open
                </button>
                <button
                    className={`btn-filter ${filterStatus === FilterStatus.closed ? 'bg-blue-500' : ''}`}
                    onClick={(): void => setFilterStatus(FilterStatus.closed)}
                >
                    Closed
                </button>
                <button
                    className={`btn-filter ${filterStatus === FilterStatus.unplanned ? 'bg-blue-500' : ''}`}
                    onClick={(): void => setFilterStatus(FilterStatus.unplanned)}
                >
                    Unplanned
                </button>
            </div>
            <SearchBar placeholder="Search by name" />
        </div>
    );
};
