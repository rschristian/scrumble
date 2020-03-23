import { observable, action } from 'mobx';
import { User } from 'models/user';

class UserStore {
    @observable currentUser: User = null;

    @action setCurrentUser(user: User): void {
        this.currentUser = user;
    }
}

export const userStore = new UserStore();
