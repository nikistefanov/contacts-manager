import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserInfo } from '../../models/user';
import { LocalStorageService, StorageKeys } from '../local-storage/local-storage.service';
import { TokenService } from '../token/token.service';
import { of, Subject, take, tap } from 'rxjs';
import { API_BASE, AUTH_LOGIN, AUTH_REGISTER } from '../../constants/api';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    get isLogged(): boolean {
        const user: IUserInfo = this.getUserInfo();

        if (user && this.hasActiveToken(user.jwt)) {
            return true;
        }

        return false;
    }

    constructor(private httpClient: HttpClient, private storageService: LocalStorageService, private tokenService: TokenService) { }

    register(user: IUser) {
        return this.httpClient.post<IUserInfo>(`${API_BASE}/${AUTH_REGISTER}`, {
            username: user.username,
            email: user.email,
            password: user.password,
        });
    }

    login(user: IUser) {
        const login$ = new Subject<IUserInfo>();
        this.httpClient.post<IUserInfo>(`${API_BASE}/${AUTH_LOGIN}`, {
            identifier: user.username,
            password: user.password
        }).subscribe(
            data => login$.next(data),
            error => login$.next(error)
        );

        return login$;
    }

    logout() {
        this.storageService.deleteItem(StorageKeys.User);

        return of(true);
    }

    getUserInfo(): IUserInfo {
        return this.storageService.getItem(StorageKeys.User) as IUserInfo;
    }

    private hasActiveToken(token: string): boolean {
        if (!token) {
            return false;
        }

        const decodedToken = this.tokenService.decode(token);
        const expirationDate = this.tokenService.convertUnixToDate(decodedToken.exp);
        const currentDate = new Date();

        return expirationDate >= currentDate;
    }
}
