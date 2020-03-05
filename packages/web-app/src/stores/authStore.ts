import { observable, action } from 'mobx';

import { LoginUser, RegistrationUser, User } from 'models/User';
import { login, logout, register } from 'services/api';
import { apiService, authStorageService } from 'ts-api-toolkit';
import { route } from 'preact-router';

class AuthStore {
    @observable user: User | undefined;
    @observable isAuthenticated = false;

    isUser = (result: User | string): result is User => {
        return !!(result as User).token;
    };

    // @action async login(credentials: LoginUser): Promise<string | void> {
    //     return await login(credentials).then((result) => {
    //         if (this.isUser(result)) {
    //             this.user = result;
    //             this.isAuthenticated = true;
    //             return;
    //         }
    //         if (typeof result == 'string') {
    //             return result;
    //         }
    //         return 'Unknown Server Error';
    //     });
    // }

    // @action async login(shortLivedJwt: string): Promise<boolean> {
    //     authStorageService.saveToken(shortLivedJwt);
    //     return await apiService.get('/authenticate/token/long-life').then((response) => {
    //         console.log(`JWT: ${response.data.jwt}`);
    //         authStorageService.saveToken(response.data.jwt);
    //         this.isAuthenticated = true;
    //         return true;
    //     });
    // }

    @action logout(): void {
        authStorageService.destroyToken();
        this.isAuthenticated = false;
        // await logout();
    }

    @action login(): boolean {
        this.isAuthenticated = true;
        console.log(`isAuthenticated: ${this.isAuthenticated}`);
        return this.isAuthenticated;
        // await login();
    }

    @action async register(credentials: RegistrationUser): Promise<string | void> {
        return await register(credentials).then((result) => {
            if (this.isUser(result)) {
                this.user = result;
                this.isAuthenticated = true;
                return;
            }
            if (typeof result == 'string') {
                return result;
            }
            return 'Unknown Server Error';
        });
    }
}

export const authStore = new AuthStore();
