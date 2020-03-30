import { createContext } from 'preact';
import { useContext } from 'preact/hooks';

import { authStore } from 'stores/authStore';
import { userLocationStore } from 'stores/userLocationStore';

export class RootStore {
    authStore = authStore;
    userLocationStore = userLocationStore;
}

export const rootStore = new RootStore();

export const StoreContext = createContext(rootStore);
export const StoreProvider = StoreContext.Provider;
export const useStore = (): RootStore => useContext(StoreContext);
