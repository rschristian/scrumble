import { observable, action } from 'mobx';

import { User } from 'models/User';
import { login, destroyOAuthToken } from 'services/api/auth';

class AuthStore {
    @observable isAuthenticated = false;
    @observable currentUser: User = null;

    @action setCurrentUser(user: User): void {
        this.currentUser = {
            id: user.id,
            name: user.name,
            username: user.username,
            avatarUrl: `https://gitlab.ryanchristian.dev${user.avatarUrl.slice(user.avatarUrl.indexOf('/uploads'))}`,
        };
    }

    @action async login(shortLivedJwt: string): Promise<void | string> {
        const error = await login(shortLivedJwt);

        if (error) return error;
        this.isAuthenticated = true;
    }

    @action async logout(): Promise<void> {
        await destroyOAuthToken();
        this.isAuthenticated = false;
        this.currentUser = null;
    }
}

export const authStore = new AuthStore();
