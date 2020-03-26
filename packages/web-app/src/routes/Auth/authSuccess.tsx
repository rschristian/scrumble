import { Fragment, FunctionalComponent, h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { getCurrentUrl, route } from 'preact-router';

import { Error } from 'components/Error';
import { AuthStoreContext } from 'stores';

const AuthSuccess: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = getCurrentUrl()
            .match(/token=(.*)/)[0]
            .substring(6);

        authStore.login(token).then((error) => {
            if (error) setErrorMessage(error);
            else route('/', true);
        });
    });

    return (
        <Fragment>
            <div className="main-content overflow-hidden">
                {!errorMessage ? (
                    <div className="loader mx-auto mt-20 block" />
                ) : (
                    <div className="mt-20 sm:w-4/5 lg:w-3/5 block">
                        <Error message={errorMessage} />
                    </div>
                )}
            </div>
        </Fragment>
    );
};

export default AuthSuccess;
