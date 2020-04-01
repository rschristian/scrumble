import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import { SearchBar } from 'components/SearchBar';
import { SprintStatus } from 'models/Sprint';

interface IProps {
    setFilter: (filterFor: string) => void;
}

// This is a rather ugly way to extend an enum. While a sprint is either active or closed,
// we also need to be able to see all. Changing the SprintStatus enum would break this filter,
// without this custom enum, if no one manually checked it.
type filterStatusEnum = SprintStatus | string;
const filterStatusEnum = {
    ...SprintStatus,
    all: 'all',
};

export const SprintFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<filterStatusEnum>(filterStatusEnum.active);

    const updateFilter = (filterStatus: string): void => {
        props.setFilter(filterStatus.toString());
        setFilterStatus(filterStatus);
    };

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.active ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(filterStatusEnum.active)}
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
                    class={`btn-filter ${filterStatus === filterStatusEnum.all ? 'btn-filter-active' : ''}`}
                    onClick={(): void => updateFilter(filterStatusEnum.all)}
                >
                    All
                </button>
            </div>
            <SearchBar
                placeholder="Search by name"
                handleOnInput={(term: string): void => console.log(term)}
                handleOnKeyDown={(e): void => {
                    if (e.key === 'Enter') console.log('Enter selected');
                }}
            />
        </div>
    );
};
