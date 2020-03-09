import { observable, action } from 'mobx';

import { authStorageService } from 'ts-api-toolkit';

class AuthStore {
    @observable isAuthenticated = false;

    @action logout(): void {
        authStorageService.destroyToken();
        this.isAuthenticated = false;
    }

    @action login(): boolean {
        this.isAuthenticated = true;
        return this.isAuthenticated;
    }
}

export const authStore = new AuthStore();
