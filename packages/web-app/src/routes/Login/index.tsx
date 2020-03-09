import { Fragment, FunctionalComponent, h } from 'preact';

const Login: FunctionalComponent = () => {
    const REDIRECT_URI = 'http://localhost:8000/oauth/code/gitlab';
    return (
        <Fragment>
            <div class="page">
                <div className="flex justify-center content-center">
                    <button className="btn-create mx-auto my-auto">
                        <a href={REDIRECT_URI}>Login with GitLab</a>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
