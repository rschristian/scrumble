import { Fragment, FunctionalComponent, h } from 'preact';

const Login: FunctionalComponent = () => {
    const REDIRECT_URI = 'http://localhost:8000/oauth/code/gitlab';
    return (
        <Fragment>
            <div class="page">
                <div class="flex justify-center content-center">
                    <button class="btn-create mx-auto my-auto">
                        <a href={REDIRECT_URI}>Login with GitLab</a>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
