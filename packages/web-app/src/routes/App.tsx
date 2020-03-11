import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';

import { Route, route, Router, RouterOnChangeArgs } from 'preact-router';

import { TopBar } from 'components/Core/TopBar';
import Home from 'routes/Home';
import { AuthStoreContext } from 'stores';

const Login = lazy(() => import('routes/Login'));
const Workspace = lazy(() => import('routes/Workspace'));
const Sprint = lazy(() => import('routes/Sprint'));
const OAuth2Success = lazy(() => import('routes/OAuth2Success'));

const App: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const publicRoutes = ['/login'];

    const authGuard = (e: RouterOnChangeArgs): void => {
        const oAuthRedirect = RegExp(/\/oauth-success\?token=(.*)/);
        if (!publicRoutes.includes(e.url) && !authStore.isAuthenticated && !oAuthRedirect.test(e.url)) {
            // route('/login');
        }
    };

    return (
        <div id="app" class="bg-blue-100">
            <TopBar />
            <Suspense fallback={<Fallback />}>
                <Router onChange={authGuard}>
                    <Home path="/" />
                    <Login path="/login" />
                    <Route path="/workspace/:workspaceId/:subPage?" component={Workspace} />
                    <Route path="/workspace/:workspaceId/sprint/:sprintId/:subPage?" component={Sprint} />
                    <Route path="/oauth-success" component={OAuth2Success} />
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

export default App;
