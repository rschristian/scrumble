import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Menu, X } from 'preact-feather';
import { useDispatch, useSelector } from 'react-redux';

import { SideBarItem } from 'components/Core/SideBar/SideBarItem';
import { RootState } from 'stores';
import { setActiveSideBarMenuItem } from 'stores/userLocationStore';

export interface SideBarLink {
    label: string;
    icon: string;
    path: string;
}

interface IProps {
    links: SideBarLink[];
}

export const SideBar: FunctionalComponent<IProps> = (props: IProps) => {
    const dispatch = useDispatch();
    const { activeSideBarItem } = useSelector((state: RootState) => state.userLocation);

    const [isOpen, setIsOpen] = useState(false);

    const listItemOnClick = (index: number): void => {
        dispatch(setActiveSideBarMenuItem(index));
    };

    const sensors = props.links.map((menuItem, index) => {
        return (
            <SideBarItem
                key={index}
                menuItem={menuItem}
                index={index}
                isOpen={isOpen}
                active={activeSideBarItem == index}
                onClick={listItemOnClick}
            />
        );
    });

    return (
        <div class={`sidebar ${isOpen ? 'w-48' : 'w-12'}`}>
            <ul class="list-reset flex flex-col text-left">
                <li onClick={(): void => setIsOpen(!isOpen)} class="side-nav-link border-b border-deep-space-sparkle">
                    <div class="flex items-start items-baseline min-h-12">
                        <div class={`my-auto ml-2 ${!isOpen ? 'block' : 'hidden'}`}>
                            <Menu size={20} />
                        </div>
                        <div class={`my-auto ml-2 ${isOpen ? 'block' : 'hidden'}`}>
                            <X size={20} />
                        </div>
                        <p class={`ml-3 my-auto ${isOpen ? 'block' : 'hidden'}`}>Close sidebar</p>
                    </div>
                </li>
                {sensors}
            </ul>
        </div>
    );
};
