import { Fragment, FunctionalComponent, h } from 'preact';
import scrumCards from 'assets/icons/scrumCards.png';

const Login: FunctionalComponent = () => {
    const REDIRECT_URI = 'http://localhost:8000/oauth/code/gitlab';
    return (
        <Fragment>
            <div class="login-page">
                <div class="form-container login-form">
                    <h1 class="login-title">Scrumble</h1>
                    <img className="h-20 w-20 mx-auto" src={scrumCards} alt="Image of Scrum Cards" />
                    <button class="btn-create mx-auto my-auto">
                        <a href={REDIRECT_URI}>Login with GitLab</a>
                    </button>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
