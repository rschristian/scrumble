import { FunctionalComponent, h } from 'preact';

interface IProps {
    placeholder: string;
}

const SearchBar: FunctionalComponent<IProps> = (props: IProps) => {
    return (
        <div class="my-5 shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            <svg
                class="absolute left-5 top-2 fill-current pointer-events-none text-gray-600 w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
            </svg>
            <input id="issueName" type="text" placeholder={props.placeholder} class="ml-10 bg-transparent" />
        </div>
    );
};

export default SearchBar;
