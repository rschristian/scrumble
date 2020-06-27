import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { getCurrentUrl, Link } from 'preact-router';

import { SideBarLink } from './index';

interface IProps {
    menuItem: SideBarLink;
    index: number;
    isOpen: boolean;
    active: boolean;
    onClick: (index: number) => void;
}

const SideBarLinkItem: FunctionalComponent<IProps> = (props: IProps) => {
    const [currentUrl] = useState(getCurrentUrl());

    const handleOnClick = (): void => {
        props.onClick(props.index);
    };

    const getUrlSubstring = (currentUrl: string): string => {
        return currentUrl.replace(/\D+$/g, '');
    };

    return (
        <Link
            href={getUrlSubstring(currentUrl) + props.menuItem.path}
            class={`tooltip ${props.active && 'bg-gray-500'}`}
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

export default SideBarLinkItem;
