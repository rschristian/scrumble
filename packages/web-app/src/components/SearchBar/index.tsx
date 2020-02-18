import { FunctionalComponent, h } from 'preact';
import { Search } from 'preact-feather';

interface IProps {
    placeholder: string;
}

const SearchBar: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div class="search-bar">
            <div class="my-auto fill-current pointer-events-none text-gray-600 w-4 h-4">
                <Search size={20} />
            </div>
            <input type="text" placeholder={props.placeholder} class="ml-5 bg-transparent" />
        </div>
    );
};

export default SearchBar;
