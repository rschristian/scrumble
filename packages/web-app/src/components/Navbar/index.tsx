import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';

import btIcon from 'assets/icons/icon-1200x1200.png';

import './style.scss';

const Navbar: FunctionalComponent = () => {
    const [burgerClicked, setBurgerClicked] = useState(false);

    return (
        <nav class="navbar navbar-component">
            <div class="container">
                <div class="navbar-brand">
                    <a class="navbar-item" href="../">
                        <img src={btIcon} alt="BT Logo" />
                    </a>
                    <span
                        class={'navbar-burger burger' + (burgerClicked ? ' is-active' : '')}
                        onClick={(): void => setBurgerClicked(!burgerClicked)}
                    >
                        <span />
                        <span />
                        <span />
                    </span>
                </div>
                <div class={'navbar-menu' + (burgerClicked ? ' is-active' : '')}>
                    <div class="navbar-end">
                        <div class="tabs is-right">
                            <ul>
                                <li class="is-active">
                                    <Link href="/">Home</Link>
                                </li>
                                <li>
                                    <Link href="/login">Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
