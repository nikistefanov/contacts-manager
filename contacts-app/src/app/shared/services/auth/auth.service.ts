import { Injectable } from '@angular/core';
import { IUser, IUserInfo } from '../../models/user';
import { LocalStorageService, StorageKeys } from '../local-storage/local-storage.service';
import { AUTH_LOGIN, AUTH_REGISTER } from '../../constants/api';
import { convertUnixToDate, decodeToken } from '../../utilities/token-helpers';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    get isLogged(): boolean {
        const user: IUserInfo = this.getUserInfo();

        return user && this.hasActiveToken(user.jwt);
    }

    constructor(private storageService: LocalStorageService, private httpClient: HttpClient) { }

    register(user: IUser): Observable<IUserInfo> {
        return this.httpClient.post<IUserInfo>(AUTH_REGISTER, {
            username: user.username,
            email: user.email,
            password: user.password,
        });
    }

    login(user: IUser): Observable<IUserInfo> {
        return this.httpClient.post<IUserInfo>(AUTH_LOGIN, {
            identifier: user.username,
            password: user.password,
        });
    }

    logout(): Observable<boolean> {
        this.storageService.deleteItem(StorageKeys.User);

        return of(true);
    }

    getUserInfo(): IUserInfo {
        return this.storageService.getItem<IUserInfo>(StorageKeys.User);
    }

    private hasActiveToken(token: string): boolean {
        if (!token) {
            return false;
        }

        const decodedToken = decodeToken(token);
        const expirationDate = convertUnixToDate(decodedToken.exp);
        const currentDate = new Date();

        return expirationDate >= currentDate;
    }
}
