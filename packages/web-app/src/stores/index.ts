import { createContext } from 'preact';

import { authStore } from 'stores/authStore';
import { workspaceStore } from 'stores/workspaceStore';

export const AuthStoreContext = createContext(authStore);
export const WorkspaceStoreContext = createContext(workspaceStore);
