import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

const AccountDropdown: FunctionalComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div class="relative">
            <button
                onClick={(): void => setIsOpen(!isOpen)}
                class="relative z-10 block h-8 w-8 rounded-full overflow-hidden border-2 border-gray-600 focus:outline-none focus:border-white"
            >
                <img
                    class="h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=256&q=80"
                    alt="Your avatar"
                ></img>
            </button>
            <button
                onClick={(): void => setIsOpen(false)}
                class={'h-full w-full bg-black opacity-50 cursor-default ' + (isOpen ? 'block' : 'hidden')}
            ></button>
            <div
                class={
                    'absolute right-0 mt-2 w-48 bg-deep-space-sparkle rounded-lg shadow-xl hover:bg-orange-500 ' +
                    (isOpen ? 'block' : 'hidden')
                }
            >
                <a href="#" class="block px-4 py-2 text-white">
                    Sign out
                </a>
            </div>
        </div>
    );
};

export default AccountDropdown;
