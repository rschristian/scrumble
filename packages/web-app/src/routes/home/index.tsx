import preact, { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router';

import btIcon from 'assets/icons/icon-1200x1200.png';
import Footer from 'components/Footer';

import './style.scss';

const Home: preact.FunctionalComponent = () => {
    const [burgerClicked, setBurgerClicked] = useState(false);

    return (
        <div class="home-page">
            <section class="hero is-fullheight is-default is-bold">
                <div class="hero-head">
                    <nav class="navbar">
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
                                                <a>Home</a>
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
                </div>
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="columns is-vcentered">
                            <div class="column is-5">
                                <figure class="image is-4by3">
                                    <img src="https://picsum.photos/800/600/?random" alt="Description" />
                                </figure>
                            </div>
                            <div class="column is-6 is-offset-1">
                                <h1 class="title is-2">Superhero Scaffolding</h1>
                                <h2 class="subtitle is-4">Let this cover page describe a product or service.</h2>
                                <br />
                                <p class="has-text-centered">
                                    <a class="button is-medium is-info is-outlined">Learn more</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default Home;
