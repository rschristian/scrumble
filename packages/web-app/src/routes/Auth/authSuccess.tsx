import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { getCurrentUrl } from 'preact-router';
import { useDispatch, useSelector } from 'react-redux';

import { Error } from 'components/Error';
import { RootState } from 'stores';
import { reduxLoginAndFetchUserInfo } from 'stores/authStore';

const AuthSuccess: FunctionalComponent = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const token = getCurrentUrl()
            .match(/token=(.*)/)[0]
            .substring(6);

        async function login(): Promise<void> {
            await dispatch(reduxLoginAndFetchUserInfo(token));
        }

        login();
    }, [dispatch]);

    return (
        <div class="main-content overflow-hidden">
            {!error ? (
                <div class="loader mx-auto mt-20 block" />
            ) : (
                <div class="mt-20 sm:w-4/5 lg:w-3/5 block">
                    <Error message={error} />
                </div>
            )}
        </div>
    );
};

export default AuthSuccess;
