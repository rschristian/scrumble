import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { SearchBar } from 'components/SearchBar';

interface IProps {
    setFilter: (filterFor: string) => void;
}

enum FilterStatus {
    open = 'open',
    closed = 'closed',
    all = 'all',
}

export const SprintFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<FilterStatus>(FilterStatus.open);

    const updateFilter = (filterStatus: FilterStatus): void => {
        props.setFilter(filterStatus.toString());
        setFilterStatus(filterStatus);
    };

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.open ? 'bg-blue-500' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.open)}
                >
                    Open
                </button>
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.closed ? 'bg-blue-500' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.closed)}
                >
                    Closed
                </button>
                <button
                    class={`btn-filter ${filterStatus === FilterStatus.all ? 'bg-blue-500' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.all)}
                >
                    All
                </button>
            </div>
            <SearchBar placeholder="Search by name" />
        </div>
    );
};
