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

    // This is pretty gross, but it's a psuedo lazy loading system that
    // normal loads when any given lazy route has been loaded. Best of both worlds.
    let WorkspacesEdit: any = lazy(() => {
        WorkspacesIssues = import('routes/Workspaces/issues');
        WorkspacesMetrics = import('routes/Workspaces/metrics');
        WorkspacesSprints = import('routes/Workspaces/sprints');
        return import('routes/Workspaces/edit');
    });
    let WorkspacesIssues: any = lazy(() => {
        WorkspacesEdit = import('routes/Workspaces/edit');
        WorkspacesMetrics = import('routes/Workspaces/metrics');
        WorkspacesSprints = import('routes/Workspaces/sprints');
        return import('routes/Workspaces/issues');
    });
    let WorkspacesMetrics: any = lazy(() => {
        WorkspacesEdit = import('routes/Workspaces/edit');
        WorkspacesIssues = import('routes/Workspaces/issues');
        WorkspacesSprints = import('routes/Workspaces/sprints');
        return import('routes/Workspaces/metrics');
    });
    let WorkspacesSprints: any = lazy(() => {
        WorkspacesEdit = import('routes/Workspaces/edit');
        WorkspacesIssues = import('routes/Workspaces/issues');
        WorkspacesMetrics = import('routes/Workspaces/metrics');
        return import('routes/Workspaces/sprints');
    });

    let SprintEdit: any = lazy(() => {
        SprintIssues = import('routes/Sprints/issues');
        SprintMetrics = import('routes/Sprints/sprintMetrics');
        IssuesBoard = import('routes/Sprints/issuesBoard');
        return import('routes/Sprints/edit');
    });
    let SprintMetrics: any = lazy(() => {
        SprintEdit = import('routes/Sprints/edit');
        SprintIssues = import('routes/Sprints/issues');
        IssuesBoard = import('routes/Workspaces/sprints');
        return import('routes/Sprints/sprintMetrics');
    });
    let IssuesBoard: any = lazy(() => {
        SprintEdit = import('routes/Sprints/edit');
        SprintIssues = import('routes/Sprints/issues');
        SprintMetrics = import('routes/Sprints/sprintMetrics');
        return import('routes/Sprints/issuesBoard');
    });
    let SprintIssues: any = lazy(() => {
        SprintEdit = import('routes/Sprints/edit');
        SprintMetrics = import('routes/Sprints/sprintMetrics');
        IssuesBoard = import('routes/Sprints/issuesBoard');
        return import('routes/Sprints/issues');
    });

    return (
        <div id="app" class="bg-blue-100">
            <Suspense fallback={<div>Loading...</div>}>
                {/*{authGuard()}*/}
                <TopBar />
                <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                    <Home path="/" />
                    <Login path="/login" />
                    <Route path="/workspace/:id" component={WorkspacesSprints} />
                    <Route path="/workspace/:id/issues" component={WorkspacesIssues} />
                    <Route path="/workspace/:id/metrics" component={WorkspacesMetrics} />
                    <Route path="/workspace/:id/edit" component={WorkspacesEdit} />
                    <SprintMetrics path="/workspace/:id/sprint/:id/metrics" />
                    <IssuesBoard path="/workspace/:id/sprint/:id/board" />
                    <SprintIssues path="/workspace/:id/sprint/:id/issues" />
                    <SprintEdit path="/workspace/:id/sprint/:id/edit" />
                </Router>
            </Suspense>
        </div>
    );
};

export default App;
