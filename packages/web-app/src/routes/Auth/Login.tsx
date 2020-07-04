import { FunctionalComponent, h } from 'preact';
import { useEffect } from 'preact/hooks';
import { useDispatch } from 'react-redux';

import scrumCards from 'assets/icons/scrumCards.png';
import { reduxLogUserOut } from 'stores/authStore';

const Login: FunctionalComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reduxLogUserOut());
    }, [dispatch]);

    return (
        <div class="form-container login-form">
            <h1 class="login-title">Scrumble</h1>
            <img class="h-20 w-20 mx-auto" src={scrumCards} alt="Image of Scrum Cards" />
            <button
                class="btn-create mx-auto my-auto"
                onClick={(): string => (location.href = '/api/oauth2/authorize/gitlab')}
            >
                Login with GitLab
            </button>
        </div>
    );
};

export default Login;
