import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import { getCurrentUrl, Route, route, Router, RouterOnChangeArgs } from 'preact-router';

import { TopBar } from 'components/Navigation/TopBar';
import Home from 'routes/Home';
import { AuthStoreContext } from 'stores';

const Login = lazy(() => import('routes/Login'));
const Workspace = lazy(() => import('routes/Workspace'));
const Sprint = lazy(() => import('routes/Sprint'));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug');
}

const App: FunctionalComponent = () => {
    const authStore = useContext(AuthStoreContext);

    const [currentUrl, setCurrentUrl] = useState<string>(getCurrentUrl());

    const publicRoutes = ['/login'];

    const authGuard = (): void => {
        if (!publicRoutes.includes(currentUrl) && !authStore.isAuthenticated) {
            // TODO: Half broken until https://github.com/preactjs/preact-router/issues/357 is resolved
            route('/login');
        }
    };

    return (
        <div id="app" class="bg-blue-100">
            {/*{authGuard()}*/}
            <TopBar />
            <Suspense fallback={<Fallback />}>
                <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                    <Home path="/" />
                    <Login path="/login" />
                    <Route path="/workspace/:workspaceId" component={Workspace} />
                    <Route path="/workspace/:workspaceId/issues" component={Workspace} />
                    <Route path="/workspace/:workspaceId/metrics" component={Workspace} />
                    <Route path="/workspace/:workspaceId/edit" component={Workspace} />
                    <Route path="/workspace/:workspaceId/sprint/:sprintId/" component={Sprint} />
                    <Route path="/workspace/:workspaceId/sprint/:sprintId/board" component={Sprint} />
                    <Route path="/workspace/:workspaceId/sprint/:sprintId/metrics" component={Sprint} />
                    <Route path="/workspace/:workspaceId/sprint/:sprintId/showandtell" component={Sprint} />
                    <Route path="/workspace/:workspaceId/sprint/:sprintId/edit" component={Sprint} />
                </Router>
            </Suspense>
        </div>
    );
};

const Fallback: FunctionalComponent = () => {
    return (
        <div className="w-screen block">
            <div className="flex">
                <div className="main-content" />
            </div>
        </div>
    );
};

export default App;
