import { Fragment, FunctionalComponent, h } from 'preact';
import { getCurrentUrl, route } from 'preact-router';
import { useEffect } from 'preact/hooks';

import { apiService, authStorageService } from 'ts-api-toolkit';
import { authStore } from 'stores/authStore';

const OAuth2Success: FunctionalComponent = () => {
    useEffect(() => {
        const url = getCurrentUrl();
        const token = url.match(/token=(.*)/)[0].substring(6);
        console.log(token);

        apiService.get('/authenticate/token/long-life').then((response) => {
            // authStorageService.saveToken(response.data.jwt);
            authStore.login(response.data.jwt);
        });

        authStorageService.saveToken(token);
    });

    return (
        <Fragment>
            <div class="page">
                <div className="create-bar">
                    <h1 className="page-heading">OAuth2 Success</h1>
                </div>
            </div>
        </Fragment>
    );
};

export default OAuth2Success;
