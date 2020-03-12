import { observable, action } from 'mobx';

class WorkspaceStore {
    @observable currentWorkspace = 0;

    @action setWorkspace(workspaceId: number): void {
        this.currentWorkspace = workspaceId;
    }
}

export const workspaceStore = new WorkspaceStore();
