import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';

import scrumCards from 'assets/icons/scrumCards.png';
import { authStore } from 'stores/authStore';
import { route } from 'preact-router';

const Login: FunctionalComponent = () => {
    useEffect(() => {
        authStore.logout().then();
    });

    const linkTo = (): void => {
        authStore.login().then(() => route('/', true));
    };

    return (
        <div class="login-page">
            <div class="form-container login-form">
                <h1 class="login-title">Scrumble</h1>
                <img class="h-20 w-20 mx-auto" src={scrumCards} alt="Image of Scrum Cards" />
                <button class="btn-create mx-auto my-auto" onClick={linkTo}>
                    Login with GitLab
                </button>
            </div>
        </div>
    );
};

export default Login;
