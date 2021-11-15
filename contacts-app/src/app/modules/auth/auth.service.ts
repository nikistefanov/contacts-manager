import { Injectable } from '@angular/core';
import { IUser, IUserInfo } from '../../shared/models/user';
import { LocalStorageService, StorageKeys } from '../../shared/services/local-storage/local-storage.service';
import { convertUnixToDate, decodeToken } from '../../shared/utilities/token-helpers';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { API_BASE } from '../../shared/constants/api';

const AUTH_LOGIN = `${API_BASE}/auth/local`;
const AUTH_REGISTER = `${AUTH_LOGIN}/register`;

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    get isLogged(): boolean {
        const user: IUserInfo = this.getUserInfo();

        return !!user && this.hasActiveToken(user.jwt);
    }

    constructor(private storageService: LocalStorageService, private http: HttpClient) { }

    register(user: IUser): Observable<IUserInfo> {
        return this.http.post<IUserInfo>(AUTH_REGISTER, {
            username: user.username,
            email: user.email,
            password: user.password,
        });
    }

    login(user: IUser): Observable<IUserInfo> {
        return this.http.post<IUserInfo>(AUTH_LOGIN, {
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
