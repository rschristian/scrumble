import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import { Menu, X } from 'preact-feather';

import scrumCards from 'assets/icons/scrumCards.png';
import avatar from 'assets/gitlab_avatar.png';

export const TopBar: FunctionalComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    return (
        <header>
            <div class="header min-h-16">
                <div class="flex items-center justify-between px-4 py-3 sm:p-0">
                    <Link href="/" class="flex items-center flex-shrink-0 text-deep-space-sparkle mr-6">
                        <img class="h-8" src={scrumCards} alt="Image of Scrum Cards" />
                        <span class="ml-1 font-semibold text-xl tracking-wide">Scrumble</span>
                    </Link>
                    <div class="sm:hidden">
                        <button
                            onClick={(): void => setIsOpen(!isOpen)}
                            type="button"
                            class="block text-deep-space-sparkle hover:text-gray-400 focus:outline-none"
                        >
                            <div className="flex items-start items-baseline min-h-12">
                                <div className={`my-auto ml-2 ${!isOpen ? 'block' : 'hidden'}`}>
                                    <Menu size={20} />
                                </div>
                                <div className={`my-auto ml-2 ${isOpen ? 'block' : 'hidden'}`}>
                                    <X size={20} />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <nav class={`sm:block ${isOpen ? '' : 'hidden'}`}>
                    <div class="sm:flex sm:p-0">
                        <div class="hidden sm:block sm:ml-6">
                            <div className="relative">
                                <button
                                    onClick={(): void => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                    onBlur={(): void => setIsAccountDropdownOpen(false)}
                                    className={`btn-account-dropdown ${
                                        isAccountDropdownOpen ? 'outline-none border-white' : ''
                                    }`}
                                >
                                    <img className="avatar" src={avatar} alt="Your avatar" />
                                </button>
                                <div className={`btn-sign-out shadow-lg ${isAccountDropdownOpen ? 'block' : 'hidden'}`}>
                                    <a
                                        href="http://localhost:8082/logout"
                                        className="block px-4 py-2 text-white text-center"
                                    >
                                        Sign out
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div
                className={`sm:hidden z-20 fixed w-full mt-16 bg-gray-200 border-b border-gray-500 ${
                    isOpen ? 'block' : 'hidden'
                }`}
            >
                <div className="flex items-center border-b border-gray-300 py-2">
                    <img className="ml-3 avatar" src={avatar} alt="Your avatar" />
                    <span className="ml-3 font-semibold text-deep-space-sparkle">Greg</span>
                </div>
                <div className="my-4 ml-3">
                    <Link href="http://localhost:8082/logout" class="top-nav-dropdown-link">
                        Sign out
                    </Link>
                </div>
            </div>
        </header>
    );
};
