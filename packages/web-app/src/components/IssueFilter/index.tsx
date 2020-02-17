import { FunctionalComponent, h } from 'preact';

const IssueFilter: FunctionalComponent = () => {
    return (
        <div>
            <div class="my-4 flex flex-col items-start">
                <div class="flex rounded shadow">
                    <button class="align-baseline bg-gray-100 hover:bg-blue-500 focus:bg-blue-500 text-gray-800 hover:text-white focus:text-white font-semibold py-2 px-4 border border-gray-300">
                        Closed
                    </button>
                    <button class="align-baseline bg-gray-100 hover:bg-blue-500 focus:bg-blue-500 text-gray-800 hover:text-white focus:text-white font-semibold py-2 px-4 border border-gray-300">
                        Open
                    </button>
                    <button class="align-baseline bg-gray-100 hover:bg-blue-500 focus:bg-blue-500 text-gray-800 hover:text-white focus:text-white font-semibold py-2 px-4 border border-gray-300">
                        Unplanned
                    </button>
                </div>
                <div class="mt-5 relative shadow appearance-none border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <svg
                        class="absolute left-5 top-2 fill-current pointer-events-none text-gray-600 w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                    </svg>
                    <input id="issueName" type="text" placeholder="Search by name" class="ml-10" />
                </div>
            </div>
        </div>
    );
};

export default IssueFilter;
