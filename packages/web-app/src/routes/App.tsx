import { FunctionalComponent, h } from 'preact';
import { useContext } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import { Route, route, Router, RouterOnChangeArgs } from 'preact-router';

import { TopBar } from 'components/Core/TopBar';
import AuthSuccess from 'routes/Auth/authSuccess';
import Login from 'routes/Auth/login';
import Home from 'routes/Home';
import { AuthStoreContext } from 'stores';

const Workspace = lazy(() => import('routes/Workspace'));
const Sprint = lazy(() => import('routes/Sprint'));

const App: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const publicRoutes = ['/login'];

    const authGuard = (e: RouterOnChangeArgs): void => {
        const oAuthRedirect = RegExp(/\/oauth-success\?token=(.*)/);
        if (!publicRoutes.includes(e.url) && !authStore.isAuthenticated && !oAuthRedirect.test(e.url)) {
            route('/login');
        }
    };

    return (
        <div id="app" class="bg-blue-100">
            <TopBar />
            <Suspense fallback={<Fallback />}>
                <Router onChange={authGuard}>
                    {/*<Router>*/}
                    <Route path="/" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/oauth-success" component={AuthSuccess} />
                    <Route path="/workspace/:workspaceId/:subPage?" component={Workspace} />
                    <Route path="/workspace/:workspaceId/sprint/:sprintId/:subPage?" component={Sprint} />
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
