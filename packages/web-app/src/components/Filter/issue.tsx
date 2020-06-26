import { FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

import { IssueStatus } from 'models/Issue';
import SearchBar from 'components/SearchBar';

interface IProps {
    setFilter: (filterStatus: string, searchTerm: string) => void;
}

// This is a rather ugly way to extend an enum.
type filterStatusEnum = IssueStatus | string;
const filterStatusEnum = {
    ...IssueStatus,
    unplanned: 'unplanned',
    all: 'all',
};

const IssueFilter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState<filterStatusEnum>(filterStatusEnum.open);
    const [searchTerm, setSearchTerm] = useState('');
    const { setFilter } = props;

    useEffect(() => {
        setFilter(filterStatus.toString(), searchTerm);
    }, [setFilter, filterStatus, searchTerm]);

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                <button
                    class={`btn-filter ${filterStatus === filterStatusEnum.open ? 'btn-filter-active' : ''}`}
                    onClick={(): void => setFilterStatus(filterStatusEnum.open)}
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
                    class={`btn-filter ${filterStatus === filterStatusEnum.unplanned ? 'btn-filter-active' : ''}`}
                    onClick={(): void => setFilterStatus(filterStatusEnum.unplanned)}
                >
                    Unplanned
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

export default IssueFilter;
