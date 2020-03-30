import { observable, action } from 'mobx';
import { AsyncTrunk } from 'mobx-sync';

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

    @action async logout(): Promise<void> {
        await destroyOAuthToken();
        this.isAuthenticated = false;
    }
}

export const authStore = new AuthStore();

new AsyncTrunk(authStore, { storage: localStorage }).init().then();
