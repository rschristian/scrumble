import { observable, action } from 'mobx';

import { Workspace } from 'models/Workspace';
import { Sprint } from 'models/Sprint';

class UserLocationStore {
    @observable currentWorkspace: Workspace = null;
    @observable currentSprint: Sprint = null;
    @observable activeSideBarItem = 0;

    @action setWorkspace(workspace: Workspace): void {
        this.currentWorkspace = workspace;
    }

    @action setSprint(sprint: Sprint): void {
        this.currentSprint = sprint;
    }

    @action setActiveSideBarItem(index: number): void {
        this.activeSideBarItem = index;
    }
}

export const userLocationStore = new UserLocationStore();
