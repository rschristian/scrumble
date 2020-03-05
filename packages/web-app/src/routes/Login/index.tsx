import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { AuthStoreContext } from '../../stores';
import { route } from 'preact-router';

const Login: FunctionalComponent = () => {
    const REDIRECT_URI = 'http://localhost:8082/oauth/code/gitlab';

    const authStore = useContext(AuthStoreContext);

    const test = (): void => {
        console.log('in test');
        authStore.login();
        route('/');
    };

    return (
        <Fragment>
            {/*{test()}*/}
            <div class="page">
                <div className="create-bar">
                    <h1 className="page-heading">Login</h1>
                    <button className="btn-create my-auto">
                        <a href={'http://localhost:8082/oauth/code/gitlab'}>Login with GitLab</a>
                    </button>
                    {/*<button onClick={() => test()} className="btn-create my-auto">*/}
                    {/*    Login with GitLab*/}
                    {/*</button>*/}
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
