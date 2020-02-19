import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { lazy, Suspense } from 'preact/compat';
import { getCurrentUrl, Route, route, Router, RouterOnChangeArgs } from 'preact-router';

import TopBar from 'components/Navigation/TopBar';
import Home from 'routes/Home';
import { AuthStoreContext } from 'stores';

const Login = lazy(() => import('routes/Login'));

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

    let WorkspacesSprints: any = lazy(() => {
        WorkspacesIssues = import('routes/Workspaces/issues');
        WorkspacesMetrics = import('routes/Workspaces/metrics');
        WorkspacesEdit = import('routes/Workspaces/edit');
        return import('routes/Workspaces/sprints');
    });
    let WorkspacesIssues: any = lazy(() => {
        WorkspacesSprints = import('routes/Workspaces/sprints');
        WorkspacesMetrics = import('routes/Workspaces/metrics');
        WorkspacesEdit = import('routes/Workspaces/edit');
        return import('routes/Workspaces/issues');
    });
    let WorkspacesMetrics: any = lazy(() => {
        WorkspacesSprints = import('routes/Workspaces/sprints');
        WorkspacesIssues = import('routes/Workspaces/issues');
        WorkspacesEdit = import('routes/Workspaces/edit');
        return import('routes/Workspaces/metrics');
    });
    let WorkspacesEdit: any = lazy(() => {
        WorkspacesSprints = import('routes/Workspaces/sprints');
        WorkspacesIssues = import('routes/Workspaces/issues');
        WorkspacesMetrics = import('routes/Workspaces/metrics');
        return import('routes/Workspaces/edit');
    });

    let SprintIssues: any = lazy(() => {
        SprintBoard = import('routes/Sprints/board');
        SprintMetrics = import('routes/Sprints/metrics');
        SprintEdit = import('routes/Workspaces/edit');
        return import('routes/Sprints/issues');
    });
    let SprintBoard: any = lazy(() => {
        SprintIssues = import('routes/Sprints/issues');
        SprintMetrics = import('routes/Sprints/metrics');
        SprintEdit = import('routes/Sprints/edit');
        return import('routes/Sprints/board');
    });
    let SprintMetrics: any = lazy(() => {
        SprintIssues = import('routes/Sprints/issues');
        SprintBoard = import('routes/Sprints/board');
        SprintEdit = import('routes/Sprints/edit');
        return import('routes/Sprints/metrics');
    });
    let SprintEdit: any = lazy(() => {
        SprintIssues = import('routes/Sprints/issues');
        SprintBoard = import('routes/Sprints/board');
        SprintMetrics = import('routes/Sprints/metrics');
        return import('routes/Sprints/edit');
    });

    return (
        <div id="app" class="bg-blue-100">
            {/*{authGuard()}*/}
            <TopBar />
            <Suspense fallback={<Fallback />}>
                <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                    <Home path="/" />
                    <Login path="/login" />
                    <Route path="/workspace/:id" component={WorkspacesSprints} />
                    <Route path="/workspace/:id/issues" component={WorkspacesIssues} />
                    <Route path="/workspace/:id/metrics" component={WorkspacesMetrics} />
                    <Route path="/workspace/:id/edit" component={WorkspacesEdit} />
                    <Route path="/workspace/:id/sprint/:id/issues" component={SprintIssues} />
                    <Route path="/workspace/:id/sprint/:id/board" component={SprintBoard} />
                    <Route path="/workspace/:id/sprint/:id/metrics" component={SprintMetrics} />
                    <Route path="/workspace/:id/sprint/:id/edit" component={SprintEdit} />
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
