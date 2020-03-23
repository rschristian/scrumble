import { observable, action } from 'mobx';
import { Workspace } from 'models/Workspace';
import { Sprint } from 'models/Sprint';

class UserLocationStore {
    @observable currentWorkspace: Workspace | null = JSON.parse(localStorage.getItem('currentWorkspace')) || null;
    @observable currentSprint: Sprint | null = JSON.parse(localStorage.getItem('currentSprint')) || null;

    @action setWorkspace(workspace: Workspace): void {
        localStorage.setItem('currentWorkspace', JSON.stringify(workspace));
        this.currentWorkspace = workspace;
    }

    @action setSprint(sprint: Sprint): void {
        localStorage.setItem('currentSprint', JSON.stringify(sprint));
        this.currentSprint = sprint;
    }
}

export const userLocationStore = new UserLocationStore();
