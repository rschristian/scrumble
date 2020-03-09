import { FunctionalComponent, h } from 'preact';
import { SearchBar } from 'components/SearchBar';
import { useState } from 'preact/hooks';

enum FilterStatus {
    all,
    open,
    closed,
}

export const SprintFilter: FunctionalComponent = () => {
    const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.all);

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.all ? 'bg-blue-500' : ''}`}
                    onClick={(): void => setFilterStatus(FilterStatus.all)}
                >
                    All
                </button>
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.open ? 'bg-blue-500' : ''}`}
                    onClick={(): void => setFilterStatus(FilterStatus.open)}
                >
                    Open
                </button>
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.closed ? 'bg-blue-500' : ''}`}
                    onClick={(): void => setFilterStatus(FilterStatus.closed)}
                >
                    Closed
                </button>
            </div>
            <SearchBar placeholder="Search by name" />
        </div>
    );
};
