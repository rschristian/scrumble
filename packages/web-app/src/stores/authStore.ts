import { observable, action } from 'mobx';
import { login, destroyOAuthToken } from 'services/api/auth';

class AuthStore {
    @observable isAuthenticated = false;

    @action async logout(): Promise<boolean> {
        return await destroyOAuthToken().then(() => {
            this.isAuthenticated = false;
            return true;
        });
    }

    @action async login(shortLivedJwt: string): Promise<boolean> {
        return await login(shortLivedJwt).then((success) => {
            if (success) {
                this.isAuthenticated = true;
                return this.isAuthenticated;
            }
            return false;
        });
    }
}

export const authStore = new AuthStore();
