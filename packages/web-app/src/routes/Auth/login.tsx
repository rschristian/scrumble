import { FunctionalComponent, h } from 'preact';

import scrumCards from 'assets/icons/scrumCards.png';

const Login: FunctionalComponent = () => {
    return (
        <div class="login-page">
            <div class="form-container login-form">
                <h1 class="login-title">Scrumble</h1>
                <img class="h-20 w-20 mx-auto" src={scrumCards} alt="Image of Scrum Cards" />
                <button
                    class="btn-create mx-auto my-auto"
                    onClick={(): string => (location.href = '/api/v1/oauth2/authorize/gitlab')}
                >
                    Login with GitLab
                </button>
            </div>
        </div>
    );
};

export default Login;
