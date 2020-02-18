import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { getCurrentUrl, route, Route, Router, RouterOnChangeArgs } from 'preact-router';

import { AuthStoreContext } from 'stores';
import Workspaces from 'components/Workspaces';
import TopBar from 'components/Navigation/TopBar';
import WorkspaceView from 'routes/Workspaces';
import SprintView from 'routes/Sprints';
import Metrics from './Sprints/Metrics';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
if ((module as any).hot) {
    // tslint:disable-next-line:no-var-requires
    require('preact/debug');
}

const App: FunctionalComponent = () => {
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
        <div id="app" class="bg-blue-100">
            {/*{authGuard()}*/}
            <TopBar />
            <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                <Workspaces path="/" />
                <Route path="/workspaces" component={Workspaces} />
                <Route path="/workspace/:id" component={WorkspaceView} />
                <Route path="/workspace/:id/metrics" component={WorkspaceView} />
                <Route path="/sprint/:id/metrics" component={Metrics} />
                <Route path="/sprint/:id" component={SprintView} />
                <Route path="/sprint/:id/metrics" component={SprintView} />
                <Route path="/sprint/:id/board" component={SprintView} />
                <Route path="/sprint/:id/show-tell" component={SprintView} />
            </Router>
        </div>
    );
};

export default App;
