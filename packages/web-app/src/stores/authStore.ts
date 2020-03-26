import { observable, action } from 'mobx';

import { User } from 'models/User';
import { login, destroyOAuthToken } from 'services/api/auth';

class AuthStore {
    @observable isAuthenticated = false;
    @observable currentUser: User = null;

    @action setCurrentUser(user: User): void {
        this.currentUser = user;
    }

    @action async login(shortLivedJwt: string): Promise<void | string> {
        const error = await login(shortLivedJwt);

        if (error) return error;
        this.isAuthenticated = true;
    }

    @action async logout(): Promise<boolean> {
        return await destroyOAuthToken().then(() => {
            this.isAuthenticated = false;
            return true;
        });
    }
}

export const authStore = new AuthStore();
