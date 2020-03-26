import { observable, action } from 'mobx';

import { User } from 'models/User';
import { login, destroyOAuthToken } from 'services/api/auth';

class AuthStore {
    @observable isAuthenticated = false;
    @observable currentUser: User = null;

    @action setCurrentUser(user: User): void {
        this.currentUser = user;
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

    @action async logout(): Promise<boolean> {
        return await destroyOAuthToken().then(() => {
            this.isAuthenticated = false;
            return true;
        });
    }
}

export const authStore = new AuthStore();
