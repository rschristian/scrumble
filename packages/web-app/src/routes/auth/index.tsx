import preact, { h, Fragment } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getCurrentUrl, Link } from 'preact-router';
import { observer } from 'mobx-react-lite';

import avatar from 'assets/avatar.png';
import Footer from 'components/Footer';
import Login from 'routes/auth/login';
import Register from 'routes/auth/register';

import './style.scss';

enum AuthType {
    login = '/login',
    register = '/register',
}

const Auth: preact.FunctionalComponent = observer(() => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [form, setForm] = useState(null);
    const [links, setLinks] = useState(null);

    useEffect(() => {
        switch (getCurrentUrl()) {
            case AuthType.login:
                setTitle('Login');
                setSubtitle('Please provide your credentials to proceed.');
                setForm(<Login />);
                setLinks(
                    <Fragment>
                        <Link href="/register">Sign Up</Link>&nbsp;·&nbsp;<Link href="/">Forgot Password</Link>
                    </Fragment>,
                );
                break;
            case AuthType.register:
                setTitle('Register');
                setSubtitle('Please provide your details to proceed.');
                setForm(<Register />);
                setLinks(
                    <Fragment>
                        <Link href="/login">Login</Link>&nbsp;·&nbsp;<Link href="/">Forgot Password</Link>
                    </Fragment>,
                );
                break;
            default:
                break;
        }
    }, [getCurrentUrl()]);

    return (
        <div class="auth-page">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="column is-4 is-offset-4">
                            <h3 class="title">{title}</h3>
                            <hr class="auth-hr" />
                            <h5 class="subtitle">{subtitle}</h5>
                            <div class="box">
                                <figure class="avatar">
                                    <img src={avatar} alt="he-man" />
                                </figure>
                                {form}
                            </div>
                            <p class="has-text-grey">{links}</p>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
});

export default Auth;
