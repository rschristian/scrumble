import { observable, action } from 'mobx';

class AuthStore {
    @observable isAuthenticated = false;

    @action logout(): void {
        this.isAuthenticated = false;
    }

    @action login(): void {
        this.isAuthenticated = true;
    }
}

export const authStore = new AuthStore();
