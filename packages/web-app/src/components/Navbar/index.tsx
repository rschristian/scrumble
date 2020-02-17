import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import AccountDropdown from '../AccountDropdown';

import scrumCards from 'assets/icons/scrumCards.png';

const Navbar: FunctionalComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header class="border-b border-gray-500 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 bg-gray-100">
            <div class="flex items-center justify-between px-4 py-3 sm:p-0">
                <div class="flex items-center flex-shrink-0 text-deep-space-sparkle mr-6">
                    <img class="h-8" src={scrumCards}></img>
                    <span class="ml-1 font-semibold text-xl tracking-wide">Scrumble</span>
                </div>
                <div class="sm:hidden">
                    <button
                        onClick={(): void => setIsOpen(!isOpen)}
                        type="button"
                        class="block text-deep-space-sparkle hover:text-gray-400 focus:outline-none"
                    >
                        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
                            <path
                                class={isOpen ? 'block' : 'hidden'}
                                d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                            />
                            <path
                                class={!isOpen ? 'block' : 'hidden'}
                                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                            />
                        </svg>
                    </button>
                </div>
                <Link
                    href="/workspaces"
                    class="block px-2 py-1 text-deep-space-sparkle font-semibold rounded hover:bg-gray-300"
                >
                    Workspaces
                </Link>
            </div>
            <nav class={'sm:block ' + (isOpen ? '' : 'hidden')}>
                <div class="px-2 pt-2 pb-4 sm:flex sm:p-0">
                    <div class="hidden sm:block sm:ml-6">
                        <AccountDropdown />
                    </div>
                </div>
                <div class="px-4 py-5 border-t border-gray-800 sm:hidden">
                    <div class="flex items-center">
                        <img
                            class="h-8 w-8 border-2 border-gray-600 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                            alt="Your avatar"
                        ></img>
                        <span class="ml-3 font-semibold text-deep-space-sparkle">Jane Doe</span>
                    </div>
                    <div class="mt-4">
                        <Link class="mt-2 block text-deep-space-sparkle hover:text-gray-400">Sign out</Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
