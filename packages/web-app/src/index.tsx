import { FunctionalComponent, h } from 'preact';
import { SyncTrunk } from 'mobx-sync';

import App from 'routes/App';
import { rootStore, StoreProvider } from 'stores';

import 'style/index.scss';

const Index: FunctionalComponent = () => {
    const initialState: any = JSON.parse(localStorage.getItem('__mobx_sync__')) || {
        authStore: {
            isAuthenticated: false,
            currentUser: null,
        },
        userLocationStore: {
            currentWorkspace: null,
            currentSprint: null,
            activeSideBarItem: 0,
        },
    };

    new SyncTrunk(rootStore, {
        onError: (e): void => console.warn('Error on storage', e),
    }).init(initialState);

    return (
        <StoreProvider value={rootStore}>
            <App />
        </StoreProvider>
    );
};

export default Index;
