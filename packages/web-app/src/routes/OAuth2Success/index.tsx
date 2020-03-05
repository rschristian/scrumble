import { Fragment, FunctionalComponent, h } from 'preact';
import { getCurrentUrl, route } from 'preact-router';
import { useContext } from 'preact/hooks';

import { AuthStoreContext } from 'stores';
import { login } from 'services/api';

const OAuth2Success: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const authenticate = (): void => {
        const url = getCurrentUrl();
        const token = url.match(/token=(.*)/)[0].substring(6);
        console.log(token);

        login(token).then((success) => {
            if (success) {
                console.log('successful authentication');
                authStore.login();
                route('/');
            }
        });
    };

    return (
        <Fragment>
            {authenticate()}
            <div class="page">
                <div className="create-bar">
                    <h1 className="page-heading">OAuth2 Success</h1>
                </div>
            </div>
        </Fragment>
    );
};

export default OAuth2Success;
