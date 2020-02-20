import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import { getCurrentUrl, Route, route, Router, RouterOnChangeArgs } from 'preact-router';

import { TopBar } from 'components/Navigation/TopBar';
import Home from 'routes/Home';
import { AuthStoreContext } from 'stores';

const Login = lazy(() => import('routes/Login'));
const Workspace = lazy(() => import('routes/Workspace'));

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

    let SprintIssues: any = lazy(() => {
        SprintBoard = import('routes/Sprint/board');
        SprintMetrics = import('routes/Sprint/metrics');
        SprintEdit = import('routes/Workspace/edit');
        return import('routes/Sprint/issues');
    });
    let SprintBoard: any = lazy(() => {
        SprintIssues = import('routes/Sprint/issues');
        SprintMetrics = import('routes/Sprint/metrics');
        SprintEdit = import('routes/Sprint/edit');
        return import('routes/Sprint/board');
    });
    let SprintMetrics: any = lazy(() => {
        SprintIssues = import('routes/Sprint/issues');
        SprintBoard = import('routes/Sprint/board');
        SprintEdit = import('routes/Sprint/edit');
        return import('routes/Sprint/metrics');
    });
    let SprintEdit: any = lazy(() => {
        SprintIssues = import('routes/Sprint/issues');
        SprintBoard = import('routes/Sprint/board');
        SprintMetrics = import('routes/Sprint/metrics');
        return import('routes/Sprint/edit');
    });

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
                    <Route path="/workspace/:workspaceId/sprint/:id/issues" component={SprintIssues} />
                    <Route path="/workspace/:workspaceId/sprint/:id/board" component={SprintBoard} />
                    <Route path="/workspace/:workspaceId/sprint/:id/metrics" component={SprintMetrics} />
                    <Route path="/workspace/:workspaceId/sprint/:id/edit" component={SprintEdit} />
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
