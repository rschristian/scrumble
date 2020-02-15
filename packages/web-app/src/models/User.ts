export interface LoginUser {
    user: {
        email: string;
        password: string;
    };
}

export interface RegistrationUser {
    user: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    };
}

export interface User {
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    refreshToken: string;
}
