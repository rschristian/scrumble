import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';

import { ISidebar } from './ISidebar';
import { Menu, X } from 'preact-feather';

const Sidebar: FunctionalComponent<ISidebar> = (props: ISidebar) => {
    const [isOpen, setIsOpen] = useState(false);

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
                            <img src={menuItem.iconPath} class="my-auto ml-2 w-5" alt={menuItem.label} />
                            <Link href={menuItem.href} class={'ml-3 my-auto ' + (isOpen ? 'block' : 'hidden')}>
                                {menuItem.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;
