import preact, { h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { getCurrentUrl, route, Route, Router, RouterOnChangeArgs } from 'preact-router';

import Home from 'routes/home';
import Login from 'routes/login';
import Register from 'routes/register';
import { AuthStoreContext } from 'stores';

const App: preact.FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const [currentUrl, setCurrentUrl] = useState<string>(getCurrentUrl());

    const publicRoutes = ['/register', '/login'];

    const authGuard = (): void => {
        if (!publicRoutes.includes(currentUrl) && !authStore.isAuthenticated) {
            // TODO: Half broken until https://github.com/preactjs/preact-router/issues/357 is resolved
            route('/login');
        }
    };

    return (
        <div id="app">
            {authGuard()}
            <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
            </Router>
        </div>
    );
};

export default App;
