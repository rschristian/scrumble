import { ComponentChild, Fragment, FunctionalComponent, h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getCurrentUrl, Link } from 'preact-router';
import { observer as mobxObserver } from 'mobx-react-lite';

// Re-typing functions with generics by assigning them to variables
// doesn't seem to work, so we create a new function :/
function observer<P>(props: P): any {
    return mobxObserver(props as any);
}

import Footer from 'components/Footer';
import Login from 'routes/auth/login';
import Register from 'routes/auth/register';

import './style.scss';

const Auth: FunctionalComponent = observer(() => {
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [form, setForm] = useState<ComponentChild>(null);
    const [links, setLinks] = useState<ComponentChild>(null);

    useEffect(() => {
        switch (getCurrentUrl()) {
            case '/login':
                setTitle('Login');
                setSubtitle('Please provide your credentials to proceed.');
                setForm(<Login />);
                setLinks(
                    <Fragment>
                        <Link href="/register">Sign Up</Link>&nbsp;·&nbsp;<Link href="/">Forgot Password</Link>
                    </Fragment>,
                );
                break;
            case '/register':
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
                                    <img src="https://picsum.photos/800/600/?random" alt="Random Image" />
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
