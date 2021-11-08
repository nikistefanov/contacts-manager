export interface IUser {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export interface IUserInfo {
    jwt: string;
    user: IUser;
}
