import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import avatar from 'assets/gitlab_avatar.png';

const AccountDropdown: FunctionalComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onFocus={(): void => setIsOpen(true)}
                onBlur={(): void => setIsOpen(false)}
                className={'btn-account-dropdown ' + (isOpen ? 'outline-none border-white' : '')}
            >
                <img className="avatar" src={avatar} alt="Your avatar" />
            </button>
            <div className={'btn-sign-out shadow-lg ' + (isOpen ? 'block' : 'hidden')}>
                <a href="#" class="block px-4 py-2 text-white text-center">
                    Sign out
                </a>
            </div>
        </div>
    );
};

export default AccountDropdown;
