import { FunctionalComponent, h } from 'preact';
import { useContext, useState } from 'preact/hooks';
import { getCurrentUrl, route, Route, Router, RouterOnChangeArgs } from 'preact-router';

import Auth from 'routes/auth';
import Home from 'routes/home';
import { AuthStoreContext } from 'stores';
import Workspaces from '../components/Workspaces';
import Navbar from '../components/Navbar';
import WorkspaceView from './WorkspaceView';
import SprintView from './SprintView';

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
            <Navbar />
            <Router onChange={(e: RouterOnChangeArgs): void => setCurrentUrl(e.url)}>
                <Home path="/" />
                <Route path="/workspaces" component={Workspaces} />
                <Route path="/workspace/:id" component={WorkspaceView} />
                <Route path="/workspace/:id/metrics" component={WorkspaceView} />
                <Route path="/sprint/:id" component={SprintView} />
                <Route path="/sprint/:id/metrics" component={SprintView} />
                <Route path="/sprint/:id/board" component={SprintView} />
                <Route path="/sprint/:id/show-tell" component={SprintView} />
                {/*<Route path="/login" component={Auth} />*/}
                {/*<Route path="/register" component={Auth} />*/}
            </Router>
        </div>
    );
};

export default App;
