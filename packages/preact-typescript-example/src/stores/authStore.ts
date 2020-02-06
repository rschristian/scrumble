import { observable, action } from 'mobx';

import { LoginUser, RegistrationUser, User } from 'models/User';
import { login, logout, register } from 'services/api';

class AuthStore {
    @observable user: User | undefined;
    @observable isAuthenticated = false;

    @action async login(credentials: LoginUser): Promise<string | void> {
        return await login(credentials).then((result) => {
            if (typeof result == 'string') {
                return result;
            } else {
                this.user = result;
                this.isAuthenticated = true;
                return;
            }
        });
    }

    @action async logout(): Promise<void> {
        this.user = undefined;
        this.isAuthenticated = false;
        await logout();
    }

    @action async register(credentials: RegistrationUser): Promise<string | void> {
        return await register(credentials).then((result) => {
            if (typeof result == 'string') {
                return result;
            } else {
                this.user = result;
                this.isAuthenticated = true;
                return;
            }
        });
    }
}

export const authStore = new AuthStore();
