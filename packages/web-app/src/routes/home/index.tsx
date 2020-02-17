import { FunctionalComponent, h } from 'preact';
import { useState } from 'preact/hooks';

import Footer from 'components/Footer';
import Navbar from 'components/Navbar';

import './style.scss';
import Workspaces from '../../components/Workspaces';

const Home: FunctionalComponent = () => {
    const [newUser, setNewUser] = useState(true);

    const handleBegin = (): void => {
        setNewUser(false);
    };

    return (
        <div class="relative bg-gray-100 h-full">
            <Workspaces />
            <Footer />
        </div>
    );
};

export default Home;
