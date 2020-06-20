import { FunctionalComponent, h, VNode } from 'preact';
import { useEffect } from 'preact/hooks';
import { Suspense } from 'preact/compat';
import { Route, route, Router } from 'preact-router';
import Notifications from 'react-notify-toast';
import { useSelector, Provider } from 'react-redux';

import { TopBar } from 'components/Core/TopBar';
import Login from 'routes/Auth/login';
import Home from 'routes/Home';
import Workspace from 'routes/Workspace';
import Sprint from 'routes/Sprint';
import store, { RootState } from 'stores';

const App: FunctionalComponent = () => {
    return (
        <div id="app" class="bg-blue-100">
            <Provider store={store}>
                <Notifications />
                <TopBar />
                <Suspense fallback={<Fallback />}>
                    <Router>
                        <Route path="/login" component={Login} />
                        <AuthenticatedRoute path="/" component={Home} />
                        <AuthenticatedRoute path="/workspace/:workspaceId/:subPage?" component={Workspace} />
                        <AuthenticatedRoute
                            path="/workspace/:workspaceId/sprint/:sprintId/:subPage?"
                            component={Sprint}
                        />
                    </Router>
                </Suspense>
            </Provider>
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
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        if (!isAuthenticated) route('/login', true);
    }, [isAuthenticated]);

    if (!isAuthenticated) return null;

    return <Route {...props} />;
};

export default App;
