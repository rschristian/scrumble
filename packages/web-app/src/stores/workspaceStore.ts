import { observable, action } from 'mobx';

class WorkspaceStore {
    @observable currentWorkspace = parseInt(localStorage.getItem('currentWorkspace'), 10) || 0;

    @action setWorkspace(workspaceId: number): void {
        localStorage.setItem('currentWorkspace', String(workspaceId));
        this.currentWorkspace = workspaceId;
    }
}

export const workspaceStore = new WorkspaceStore();
