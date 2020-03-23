import { createContext } from 'preact';

import { authStore } from 'stores/authStore';
import { userLocationStore } from 'stores/userLocationStore';

export const AuthStoreContext = createContext(authStore);
export const UserLocationStoreContext = createContext(userLocationStore);
