import { observable, action } from 'mobx';
import { destroyOAuthToken } from 'services/api';

class AuthStore {
    @observable isAuthenticated = false;

    @action async logout(): Promise<boolean> {
        return await destroyOAuthToken().then(() => {
            this.isAuthenticated = false;
            return true;
        });
    }

    @action login(): void {
        this.isAuthenticated = true;
    }
}

export const authStore = new AuthStore();
