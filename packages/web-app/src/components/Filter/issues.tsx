import { FunctionalComponent, h } from 'preact';
import { SearchBar } from 'components/SearchBar';

export const IssueFilter: FunctionalComponent = () => {
    return (
        <div>
            <div class="my-4 flex flex-col items-start">
                <div class="flex rounded shadow">
                    <button class="btn-filter">Closed</button>
                    <button class="btn-filter">Open</button>
                    <button class="btn-filter">Unplanned</button>
                </div>
                <SearchBar placeholder="Search by name" />
            </div>
        </div>
    );
};
