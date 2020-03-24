import { FunctionalComponent, h } from 'preact';
import { Search } from 'preact-feather';

interface IProps {
    placeholder: string;
    handleOnInput: (e: any) => void;
    handleOnKeyDown: (e: KeyboardEvent) => void;
}

export const SearchBar: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div class="search-bar">
            <div class="my-auto fill-current pointer-events-none text-gray-600 w-4 h-4">
                <Search size={20} />
            </div>
            <input
                type="text"
                placeholder="Search by title or description"
                class="ml-5 bg-transparent search-input"
                onKeyDown={(e): void => props.handleOnKeyDown(e)}
                onInput={(e): void => props.handleOnInput(e)}
            />
        </div>
    );
};
