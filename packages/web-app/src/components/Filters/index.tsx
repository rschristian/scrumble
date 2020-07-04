import { FunctionalComponent, h } from 'preact';
import { useEffect, useRef, useState } from 'preact/hooks';

import IssueFilter from './issue';
import SprintFilter from './sprint';
import SearchBar from './searchBar';

export enum FilterType {
    issue,
    sprint,
}

interface IProps {
    filterType: FilterType;
    setFilter: (filterStatus: string, searchTerm: string) => void;
}

const Filter: FunctionalComponent<IProps> = (props: IProps) => {
    const [filterStatus, setFilterStatus] = useState('');
    const [filterTerm, setFilterTerm] = useState('');

    const { setFilter } = props;

    const firstUpdate = useRef(true);
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        setFilter(filterStatus, filterTerm);
    }, [filterStatus, filterTerm, setFilter]);

    return (
        <div class="my-4 flex flex-col items-start">
            <div class="flex rounded shadow">
                {props.filterType === FilterType.issue ? (
                    <IssueFilter setFilter={(status: string): void => setFilterStatus(status)} />
                ) : (
                    <SprintFilter setFilter={(status: string): void => setFilterStatus(status)} />
                )}
            </div>
            <SearchBar handleOnInput={(term: string): void => setFilterTerm(term)} />
        </div>
    );
};

export default Filter;
