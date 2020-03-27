import { FunctionalComponent, h, VNode } from 'preact';
import { useContext, useEffect } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import { Route, route, Router } from 'preact-router';
import Notifications from 'react-notify-toast';

import AuthSuccess from 'routes/Auth/authSuccess';
import Login from 'routes/Auth/login';
import Home from 'routes/Home';
import { AuthStoreContext } from 'stores';

const Workspace = lazy(() => import('routes/Workspace'));
const Sprint = lazy(() => import('routes/Sprint'));

const App: FunctionalComponent = () => {
    return (
        <div id="app" class="bg-blue-100">
            <Notifications />
            <Suspense fallback={<Fallback />}>
                <Router>
                    <AuthenticatedRoute path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/oauth-success" component={AuthSuccess} />
                    <AuthenticatedRoute path="/workspace/:workspaceId/:subPage?" component={Workspace} />
                    <AuthenticatedRoute path="/workspace/:workspaceId/sprint/:sprintId/:subPage?" component={Sprint} />
                </Router>
            </Suspense>
        </div>
    );
};

const Fallback: FunctionalComponent = () => {
    return (
        <div class="w-screen block">
            <div class="flex">
                <div class="main-content" />
            </div>
        </div>
    );
};

const AuthenticatedRoute = (props: { path: string; component: FunctionalComponent }): VNode => {
    const isLoggedIn = useContext(AuthStoreContext).isAuthenticated;

    useEffect(() => {
        if (!isLoggedIn) route('/login', true);
    }, [isLoggedIn]);

    if (!isLoggedIn) return null;

    return <Route {...props} />;
};

export default App;
