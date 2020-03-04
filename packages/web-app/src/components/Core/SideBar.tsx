import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, Link } from 'preact-router';
import { Menu, X } from 'preact-feather';

import { SideBarLink } from 'models/SideBarLink';

interface IProps {
    links: SideBarLink[];
}

export const SideBar: FunctionalComponent<IProps> = (props: IProps) => {
    const [activeListItem, setActiveListItem] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const listItemOnClick = (index: number): void => {
        setActiveListItem(index);
    };

    const sensors = props.links.map((menuItem, index) => {
        return (
            <SideBarItem
                key={index}
                menuItem={menuItem}
                index={index}
                isOpen={isOpen}
                active={activeListItem == index}
                onClick={listItemOnClick}
            />
        );
    });

    return (
        <div
            className={`z-10 left-0 bg-gray-300 h-screen fixed overflow-auto border border-gray-400 ${
                isOpen ? 'w-48' : 'w-12'
            }`}
        >
            <ul class="list-reset flex flex-col text-left">
                <li
                    onClick={(): void => setIsOpen(!isOpen)}
                    className="side-nav-link border-b border-deep-space-sparkle"
                >
                    <div className="flex items-start items-baseline min-h-12">
                        <div class={`my-auto ml-2 ${!isOpen ? 'block' : 'hidden'}`}>
                            <Menu size={20} />
                        </div>
                        <div class={`my-auto ml-2 ${isOpen ? 'block' : 'hidden'}`}>
                            <X size={20} />
                        </div>
                        <p className={`ml-3 my-auto ${isOpen ? 'block' : 'hidden'}`}>Close sidebar</p>
                    </div>
                </li>
                {sensors}
            </ul>
        </div>
    );
};

// I'm super uninventive
interface JProps {
    menuItem: SideBarLink;
    index: number;
    isOpen: boolean;
    active: boolean;
    onClick: (index: number) => void;
}

const SideBarItem: FunctionalComponent<JProps> = (props: JProps) => {
    const [currentUrl] = useState<string>(getCurrentUrl());

    const handleOnClick = (): void => {
        props.onClick(props.index);
    };

    const getUrlSubstring = (currentUrl: string): string => {
        return currentUrl.replace(/\D+$/g, '');
    };

    return (
        <Link
            href={getUrlSubstring(currentUrl) + props.menuItem.path}
            class={`tooltip ${props.active ? 'bg-gray-500' : ''}`}
            onClick={handleOnClick}
        >
            {/*<span class="tooltip-text bg-blue-100 border rounded border-white text-sky-blue -mt-12">*/}
            {/*    {menuItem.label}*/}
            {/*</span>*/}
            <li class="side-nav-link">
                <img src={props.menuItem.icon} class="my-auto ml-2 w-5" alt={props.menuItem.label} />
                <div class={`ml-3 my-auto ${props.isOpen ? 'block' : 'hidden'}`}>{props.menuItem.label}</div>
            </li>
        </Link>
    );
};
