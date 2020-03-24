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

    const handleOnKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            console.log('Enter selected');
        }
    };

    const handleOnInput = (e: any): void => console.log((e.target as HTMLSelectElement).value);

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
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
                    class={`btn-filter ${filterStatus === FilterStatus.all ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(FilterStatus.all)}
                >
                    All
                </button>
            </div>
            <SearchBar placeholder="Search by name" handleOnInput={handleOnInput} handleOnKeyDown={handleOnKeyDown} />
        </div>
    );
};
