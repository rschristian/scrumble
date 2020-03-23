import { createContext } from 'preact';

import { authStore } from 'stores/authStore';
import { workspaceStore } from 'stores/workspaceStore';
import { userStore } from 'stores/userStore';

export const AuthStoreContext = createContext(authStore);
export const WorkspaceStoreContext = createContext(workspaceStore);
export const UserStoreContext = createContext(userStore);
