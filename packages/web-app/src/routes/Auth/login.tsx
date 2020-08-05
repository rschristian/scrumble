import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch } from 'react-redux';

import scrumCards from 'assets/icons/scrumCards.png';
import { loginAndFetchUserInfo, logUserOut } from 'stores/authStore';

const Login: FunctionalComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logUserOut());
    }, [dispatch]);

    const linkTo = (): void => {
        dispatch(loginAndFetchUserInfo());
    };

    return (
        <div class="login-page">
            <div class="form-container login-form">
                <h1 class="login-title">Scrumble</h1>
                <img class="h-20 w-20 mx-auto" src={scrumCards} alt="Image of Scrum Cards" />
                <button class="btn-create mx-auto my-auto" onClick={linkTo}>
                    Enter Scrumble
                </button>
            </div>
        </div>
    );
};

export default Login;
