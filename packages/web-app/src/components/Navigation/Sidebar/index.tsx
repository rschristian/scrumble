import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, Link } from 'preact-router';
import { Menu, X } from 'preact-feather';

import { SideNav } from 'models/SideNav';

interface IProps {
    items: SideNav[];
}

const Sidebar: FunctionalComponent<IProps> = (props: IProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentUrl] = useState<string>(getCurrentUrl());

    return (
        <div
            className={
                'z-10 left-0 bg-gray-300 h-screen fixed overflow-auto border border-gray-400 ' +
                (isOpen ? 'w-48' : 'w-12')
            }
        >
            <ul class="list-reset flex flex-col text-left">
                <li
                    onClick={(): void => setIsOpen(!isOpen)}
                    className="side-nav-link border-b border-deep-space-sparkle"
                >
                    <div className="flex items-start items-baseline min-h-12">
                        <div class={'my-auto ml-2 ' + (!isOpen ? 'block' : 'hidden')}>
                            <Menu size={20} />
                        </div>
                        <div class={'my-auto ml-2 ' + (isOpen ? 'block' : 'hidden')}>
                            <X size={20} />
                        </div>
                        <p className={'ml-3 my-auto ' + (isOpen ? 'block' : 'hidden')}>Close sidebar</p>
                    </div>
                </li>
                {props.items.map((menuItem, index) => {
                    return (
                        <li key={index} class="side-nav-link">
                            <img src={menuItem.icon} class="my-auto ml-2 w-5" alt={menuItem.label} />
                            <Link
                                href={getUrlSubstring(currentUrl) + menuItem.path}
                                class={'ml-3 my-auto ' + (isOpen ? 'block' : 'hidden')}
                            >
                                {menuItem.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

const getUrlSubstring = (currentUrl: string): string => {
    // This regex is used to cut off URLs for better transitions.
    // If I'm at '/workspace/1/edit', and request the sprints page,
    // it gets /'workspace/1' so that I can append 'sprints' to it,
    // making '/workspace/1/sprints'
    return currentUrl.replace(/\D+$/g, '');
};

export default Sidebar;
