import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, X } from 'preact-feather';

import scrumCards from 'assets/icons/scrumCards.png';
import { RootState } from 'stores';
import { logUserOut } from 'stores/authStore';

export const TopBar: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { isAuthenticated, currentUser } = useSelector((state: RootState) => state.auth);

    const [showAccountDropdown, setShowAccountDropdown] = useState(false);

    const logout = (): void => {
        dispatch(logUserOut());
        setShowAccountDropdown(false);
    };

    return (
        <header>
            <div class="header min-h-16">
                <div class="flex items-center justify-between px-4 py-3 sm:p-0">
                    <Link href="/" class="flex items-center flex-shrink-0 text-deep-space-sparkle mr-6">
                        <img class="h-8" src={scrumCards} alt="Image of Scrum Cards" />
                        <span class="ml-1 font-semibold text-xl tracking-wide">Scrumble</span>
                    </Link>
                    {isAuthenticated && (
                        <div class="sm:hidden">
                            <button
                                onClick={(): void => setShowAccountDropdown(!showAccountDropdown)}
                                onBlur={(): void => setShowAccountDropdown(false)}
                                type="button"
                                class="block text-deep-space-sparkle"
                            >
                                <div class="flex items-start items-baseline min-h-12">
                                    <div class={`my-auto ml-2 ${!showAccountDropdown ? 'block' : 'hidden'}`}>
                                        <Menu size={20} />
                                    </div>
                                    <div class={`my-auto ml-2 ${showAccountDropdown ? 'block' : 'hidden'}`}>
                                        <X size={20} />
                                    </div>
                                </div>
                            </button>
                        </div>
                    )}
                </div>
                {isAuthenticated && (
                    <nav class={`sm:block ${showAccountDropdown ? '' : 'hidden'}`}>
                        <div class="sm:flex sm:p-0">
                            <div class="hidden sm:block sm:ml-6">
                                <div class="relative">
                                    <button
                                        onClick={(): void => setShowAccountDropdown(!showAccountDropdown)}
                                        onBlur={(): void => setShowAccountDropdown(false)}
                                        class="btn-account-dropdown"
                                    >
                                        <img
                                            alt="Your avatar"
                                            class={`avatar ${
                                                showAccountDropdown ? 'border-2 border-deep-space-sparkle' : ''
                                            }`}
                                            src={currentUser?.avatarUrl}
                                        />
                                    </button>
                                    <button
                                        class={`btn-sign-out shadow-lg is-clickable ${
                                            showAccountDropdown ? 'block' : 'hidden'
                                        }`}
                                        onMouseDown={logout}
                                    >
                                        <span class="block px-4 py-2 text-white text-center">Sign Out</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                )}
            </div>
            {isAuthenticated && (
                <div
                    class={`sm:hidden z-20 fixed w-full mt-16 bg-gray-200 border-b border-gray-500 ${
                        showAccountDropdown ? 'block' : 'hidden'
                    }`}
                >
                    <div class="flex items-center border-b border-gray-300 py-2">
                        <img
                            alt="Your avatar"
                            className={`avatar ${showAccountDropdown ? 'border-2 border-deep-space-sparkle' : ''}`}
                            src={currentUser?.avatarUrl}
                        />
                        <span class="ml-3 font-semibold text-deep-space-sparkle">{currentUser?.username}</span>
                    </div>
                    <div class="my-4 ml-3 is-clickable" onClick={logout}>
                        <span class="top-nav-dropdown-link">Sign out</span>
                    </div>
                </div>
            )}
        </header>
    );
};
