import { observable, action } from 'mobx';
import { AsyncTrunk } from 'mobx-sync';

import { Workspace } from 'models/Workspace';
import { Sprint } from 'models/Sprint';

class UserLocationStore {
    @observable currentWorkspace: Workspace = null;
    @observable currentSprint: Sprint = null;

    @action setWorkspace(workspace: Workspace): void {
        this.currentWorkspace = workspace;
    }

    @action setSprint(sprint: Sprint): void {
        this.currentSprint = sprint;
    }
}

export const userLocationStore = new UserLocationStore();

new AsyncTrunk(userLocationStore, { storage: localStorage }).init().then();
