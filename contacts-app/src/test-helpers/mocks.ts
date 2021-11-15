import { Observable, of } from "rxjs";
import { AuthService } from "../app/modules/auth/auth.service";
import { IUserInfo } from "../app/shared/models/user"

// Active untile 2121
export const ACTIVE_USER_INFO: IUserInfo = {
    jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjQ3OTI2MzQ3Njh9.BvxfQijbyF-Tk0G-WTCL_ZtLHM-dhIy_wVtGSDGxlyk",
    user: {
        email: "john@gmail.com",
        id: 1,
        username: "john"
    }
}

export const INACTIVE_USER_INFO: IUserInfo = {
    jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjEwMDU4MDkxNjh9.Gqu7SCKN7_HlCu9XSj3ykcf5npmsZ4HKBX85MtohK7k",
    user: {
        email: "john@gmail.com",
        id: 2,
        username: "john"
    }
}

export class RouterMock {
	navigate() {}

    navigateByUrl(path: string) {}
}

export class LocalStorageServiceMock {
    private data: any = {};

    setItem(key: string, value: Object) {
        this.data[key] = value;
    }

    getItem(key: string) {
        return this.data[key];
    }
}

export class AuthServiceMock {
    private userInfo: IUserInfo;
    private userLogged: boolean;
    private userActive: boolean;

    constructor(isLogged: boolean, isActiveUser: boolean) {
        this.userActive = isActiveUser;
        this.userInfo = isActiveUser ? ACTIVE_USER_INFO : INACTIVE_USER_INFO;
        this.userLogged = isLogged;
    }

    get isLogged(): boolean {
        return this.userLogged && this.userActive;
    }

    getUserInfo(): IUserInfo {
        return this.userInfo;
    }

    login(): Observable<IUserInfo> {
        return of(this.userInfo);
    }
}
