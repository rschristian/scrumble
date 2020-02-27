import { Fragment, FunctionalComponent, h } from 'preact';

const Login: FunctionalComponent = () => {
    const REDIRECT_URI = 'http://localhost:8082/oauth/code/gitlab';

    return (
        <Fragment>
            <div class="page">
                <div className="create-bar">
                    <h1 className="page-heading">Login</h1>
                    <button className="btn-create my-auto">
                        <a href={REDIRECT_URI}>Login with GitLab</a>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
