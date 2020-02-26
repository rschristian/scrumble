import { FunctionalComponent, h } from 'preact';

const Login: FunctionalComponent = () => {
    const REDIRECT_URI = 'http://localhost:8082/oauth/code/gitlab';

    return (
        <div class="w-screen block">
            <div>
                <h1>Login</h1>
                <button>
                    <a href={REDIRECT_URI}>Login with GitLab</a>
                </button>
            </div>
        </div>
    );
};

export default Login;
