import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';

import list from 'assets/icons/list.png';
import metrics from 'assets/icons/metrics.png';
import edit from 'assets/icons/edit.png';
import projects from 'assets/icons/projects.png';
import sprinter from 'assets/icons/sprinter.png';

const WorkspaceNav: FunctionalComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            class={
                'fixed z-10 left-0 md:relative bg-gray-300 h-screen border border-gray-400 ' +
                (isOpen ? 'w-48' : 'w-12')
            }
        >
            <ul class="list-reset flex flex-col text-left">
                <li class="flex min-h-12 items-baseline items-start py-1 md:py-3 pl-1 text-deep-space-sparkle hover:bg-gray-400 focus:font-semibold focus:bg-gray-400 border-b border-deep-space-sparkle">
                    <div class="flex items-start">
                        <svg
                            onClick={(): void => setIsOpen(!isOpen)}
                            class="h-5 h-5 fill-current my-auto ml-2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                class={isOpen ? 'block' : 'hidden'}
                                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                            />
                            <path
                                class={!isOpen ? 'block' : 'hidden'}
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                            />
                        </svg>
                        {/*<p class={'ml-3 ' + (isOpen ? 'block' : 'hidden')}>Close sidebar</p>*/}
                    </div>
                </li>
                <li class="min-h-12 flex items-start py-1 md:py-3 pl-1 text-deep-space-sparkle hover:bg-gray-400 focus:font-semibold focus:bg-gray-400">
                    <img src={list} class="my-auto ml-2 w-5"></img>
                    <Link href="" class={'ml-3 ' + (isOpen ? 'block' : 'hidden')}>
                        Issues
                    </Link>
                </li>
                <li class="min-h-12 flex items-start py-1 md:py-3 pl-1 text-deep-space-sparkle hover:bg-gray-400 focus:font-semibold focus:bg-gray-400">
                    <img src={projects} class="my-auto ml-2 w-5"></img>
                    <Link href="" class={'ml-3 ' + (isOpen ? 'block' : 'hidden')}>
                        Projects
                    </Link>
                </li>
                <li class="min-h-12 flex items-start py-1 md:py-3 pl-1 text-deep-space-sparkle hover:bg-gray-400 focus:font-semibold focus:bg-gray-400">
                    <img src={sprinter} class="my-auto ml-2 w-5"></img>
                    <Link href="" class={'ml-3 ' + (isOpen ? 'block' : 'hidden')}>
                        Sprints
                    </Link>
                </li>
                <li class="min-h-12 flex items-start py-1 md:py-3 pl-1 text-deep-space-sparkle hover:bg-gray-400 focus:font-semibold focus:bg-gray-400">
                    <img src={metrics} class="my-auto ml-2 w-5"></img>
                    <Link href="" class={'ml-3 ' + (isOpen ? 'block' : 'hidden')}>
                        Metrics
                    </Link>
                </li>
                <li class="min-h-12 flex items-start py-1 md:py-3 pl-1 text-deep-space-sparkle hover:bg-gray-400 focus:font-semibold focus:bg-gray-400">
                    <img src={edit} class="my-auto ml-2 w-5"></img>
                    <Link href="" class={'ml-3 ' + (isOpen ? 'block' : 'hidden')}>
                        Edit
                    </Link>
                </li>
                {/*<li class="flex items-baseline items-start border-t border-deep-space-sparkle py-1 md:py-3 pl-1 hover:bg-gray-400 focus:font-semibold focus:bg-gray-400">*/}
                {/*    <svg class="w-5 ml-2 fill-current my-auto" viewBox="0 0 24 24">*/}
                {/*        <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />*/}
                {/*    </svg>*/}
                {/*    <button*/}
                {/*        onClick={(): void => setIsOpen(!isOpen)}*/}
                {/*        type="button"*/}
                {/*        class="block text-deep-space-sparkle focus:outline-none ml-3"*/}
                {/*    >*/}
                {/*        {' '}*/}
                {/*        Close sidebar*/}
                {/*    </button>*/}
                {/*</li>*/}
            </ul>
        </div>
    );
};

export default WorkspaceNav;
