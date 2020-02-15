import { createContext } from 'preact';

import { authStore } from 'stores/authStore';

export const AuthStoreContext = createContext(authStore);
