import preact, { h } from 'preact';
import { useState } from 'preact/hooks';

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import CreateWorkspace from 'routes/home/createWorkspace';
import Initial from 'routes/home/initial';

import './style.scss';

const Home: preact.FunctionalComponent = () => {
    const [newUser, setNewUser] = useState(true);

    const handleBegin = (): void => {
        setNewUser(false);
    };

    return (
        <div class="home-page">
            <section class="hero is-fullheight is-default is-bold">
                <div class="hero-head">
                    <Navbar />
                </div>
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="columns is-vcentered">
                            <Initial onBegin={handleBegin} show={newUser} />
                            <CreateWorkspace show={!newUser} />
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
};

export default Home;
