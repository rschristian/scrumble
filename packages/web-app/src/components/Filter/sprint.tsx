import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { SearchBar } from 'components/SearchBar';
import { SprintStatus } from 'models/Sprint';

interface IProps {
    setFilter: (filterStatus: string, searchTerm: string) => void;
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
    const [searchTerm, setSearchTerm] = useState('');
    const { setFilter } = props;

    useEffect(() => {
        setFilter(filterStatus.toString(), searchTerm);
    }, [setFilter, filterStatus, searchTerm]);

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.active ? 'btn-filter-active' : ''}`}
                    onClick={(): void => setFilterStatus(filterStatusEnum.active)}
                >
                    Open
                </button>
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.closed ? 'btn-filter-active' : ''}`}
                    onClick={(): void => setFilterStatus(filterStatusEnum.closed)}
                >
                    Closed
                </button>
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.all ? 'btn-filter-active' : ''}`}
                    onClick={(): void => setFilterStatus(filterStatusEnum.all)}
                >
                    All
                </button>
            </div>
            <SearchBar handleOnInput={(term: string): void => setSearchTerm(term)} />
        </div>
    );
};
