export interface IUser {
    id: number;
    username: string;
    email: string;
    password?: string;
}

export interface IUserInfo {
    jwt: string;
    user: IUser;
}

export interface IUserRegistration extends IUser {
    passwords: {
        password: string;
        confirmPassowrd: string;
    }
}
