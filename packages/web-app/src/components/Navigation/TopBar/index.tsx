import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';
import { Menu, X } from 'preact-feather';

import scrumCards from 'assets/icons/scrumCards.png';
import avatar from 'assets/gitlab_avatar.png';

const TopBar: FunctionalComponent = () => {
    // TODO What is this for? Some sort of hidden menu that's not yet implemented? I'm a bit lost in this file, sorry if I'm being silly
    const [isOpen, setIsOpen] = useState(false);
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

    return (
        <header class="header min-h-16">
            <div class="flex items-center justify-between px-4 py-3 sm:p-0">
                <div class="flex items-center flex-shrink-0 text-deep-space-sparkle mr-6">
                    <img class="h-8" src={scrumCards} alt="Image of Scrum Cards" />
                    <span class="ml-1 font-semibold text-xl tracking-wide">Scrumble</span>
                </div>
                <div class="sm:hidden">
                    <button
                        onClick={(): void => setIsOpen(!isOpen)}
                        type="button"
                        class="block text-deep-space-sparkle hover:text-gray-400 focus:outline-none"
                    >
                        <div className="flex items-start items-baseline min-h-12">
                            <div className={'my-auto ml-2 ' + (!isOpen ? 'block' : 'hidden')}>
                                <Menu size={20} />
                            </div>
                            <div className={'my-auto ml-2 ' + (isOpen ? 'block' : 'hidden')}>
                                <X size={20} />
                            </div>
                        </div>
                    </button>
                </div>
                {/*TODO What if we just made the Scrumble name and image a link instead? I think that's common enough where people would understand?*/}
                <Link href="/" class={'header-link hidden md:block'}>
                    Home
                </Link>
            </div>
            <nav class={'sm:block ' + (isOpen ? '' : 'hidden')}>
                <div class="sm:flex sm:p-0">
                    <div class="hidden sm:block sm:ml-6">
                        <div className="relative">
                            <button
                                onClick={(): void => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                onBlur={(): void => setIsAccountDropdownOpen(false)}
                                className={
                                    'btn-account-dropdown ' + (isAccountDropdownOpen ? 'outline-none border-white' : '')
                                }
                            >
                                <img className="avatar" src={avatar} alt="Your avatar" />
                            </button>
                            <div className={'btn-sign-out shadow-lg ' + (isAccountDropdownOpen ? 'block' : 'hidden')}>
                                <a href="#" className="block px-4 py-2 text-white text-center">
                                    Sign out
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* TODO What's all this for? Doesn't seem to be visible, but also looks like it's duplicates of the home button and account drop down?*/}

                    {/*    <Link*/}
                    {/*        href="/workspaces"*/}
                    {/*        class={*/}
                    {/*            'header-link px-4 py-5 border-t border-deep-space-sparkle sm:hidden ' +*/}
                    {/*            (isOpen ? 'block' : 'hidden')*/}
                    {/*        }*/}
                    {/*    >*/}
                    {/*        Workspaces*/}
                    {/*    </Link>*/}
                    {/*</div>*/}
                    {/*<div class="px-4 py-5 border-t border-gray-800 sm:hidden">*/}
                    {/*    <div class="flex items-center">*/}
                    {/*        <img class="avatar" src={avatar} alt="Your avatar" />*/}
                    {/*        <span class="ml-3 font-semibold text-deep-space-sparkle">Greg</span>*/}
                    {/*    </div>*/}
                    {/*    <div class="mt-4">*/}
                    {/*        <Link class="top-nav-dropdown-link">Sign out</Link>*/}
                    {/*    </div>*/}
                </div>
            </nav>
        </header>
    );
};

export default TopBar;
