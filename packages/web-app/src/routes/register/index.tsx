import preact, { h } from 'preact';
import { useContext, useEffect, useState } from 'preact/hooks';
import { Link, route } from 'preact-router';
import { observer } from 'mobx-react-lite';
import { LogIn } from 'react-feather';

import avatar from 'assets/avatar.png';
import Footer from 'components/Footer';
import { RegistrationUser } from 'models/User';
import { AuthStoreContext } from 'stores';

import './style.scss';

const Register: preact.FunctionalComponent = observer(() => {
    const authStore = useContext(AuthStoreContext);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errors, setErrors] = useState('');
    const [inProgress, setInProgress] = useState(false);

    useEffect(() => authStore.logout);

    const submitDetails = (): void => {
        setInProgress(true);
        const credentials: RegistrationUser = { user: { firstName, lastName, email, password } };

        // TODO: No type hints here? login() was perfectly happy to take registration credentials?
        authStore.register(credentials).then((errors) => {
            setInProgress(false);
            if (errors) setErrors(errors);
            else if (authStore.isAuthenticated) route('/');
        });
    };

    return (
        <div class="login-page">
            <section class="hero is-fullheight">
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <div class="column is-4 is-offset-4">
                            <h3 class="title">Register</h3>
                            <hr class="login-hr" />
                            <h5 class="subtitle">Please provide your details to proceed.</h5>
                            <div class="box">
                                <figure class="avatar">
                                    <img src={avatar} alt="he-man" />
                                </figure>
                                <form>
                                    <div class="field">
                                        <div class="control">
                                            <input
                                                class="input is-large"
                                                type="text"
                                                placeholder="Your First Name"
                                                value={firstName}
                                                onInput={(e): void =>
                                                    setFirstName((e.target as HTMLInputElement).value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <input
                                                class="input is-large"
                                                type="text"
                                                placeholder="Your Last Name"
                                                value={lastName}
                                                onInput={(e): void => setLastName((e.target as HTMLInputElement).value)}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <input
                                                class="input is-large"
                                                type="email"
                                                placeholder="Your Email"
                                                value={email}
                                                onInput={(e): void => {
                                                    setErrors('');
                                                    setEmail((e.target as HTMLInputElement).value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <input
                                                class="input is-large"
                                                type="password"
                                                placeholder="Your Password"
                                                value={password}
                                                onInput={(e): void => {
                                                    setErrors('');
                                                    setPassword((e.target as HTMLInputElement).value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="control">
                                            <h2 class="error is-size-5">{errors}</h2>
                                        </div>
                                    </div>
                                    <button
                                        class={
                                            'button is-block is-deep-space-sparkle is-large is-fullwidth' +
                                            (inProgress ? ' is-loading' : '')
                                        }
                                        type="button"
                                        onClick={(): void => submitDetails()}
                                    >
                                        <div class="level">
                                            <div class="level-item">
                                                <span>Submit</span>
                                                <span class="icon is-small">
                                                    <LogIn />
                                                </span>
                                            </div>
                                        </div>
                                    </button>
                                </form>
                            </div>
                            <p class="has-text-grey">
                                <Link href="/login">Login</Link> &nbsp;·&nbsp;
                                <Link href="/">Forgot Password</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </section>
        </div>
    );
});

export default Register;
