import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser, IUserInfo } from '../../models/user';
import { LocalStorageService, StorageKeys } from '../local-storage/local-storage.service';
import { API_BASE, AUTH_LOGIN, AUTH_REGISTER } from '../../constants/api';
import axios from 'axios';
import { convertUnixToDate, decodeToken } from '../../utilities/token-helpers';

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

    constructor(private httpClient: HttpClient, private storageService: LocalStorageService) { }

    async register(user: IUser) {
        return await axios
            .post<IUserInfo>(`${API_BASE}/${AUTH_REGISTER}`, {
                username: user.username,
                email: user.email,
                password: user.password,
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }

    async login(user: IUser) {
        return await axios
            .post<IUserInfo>(`${API_BASE}/${AUTH_LOGIN}`, {
                identifier: user.username,
                password: user.password,
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }

    logout() {
        this.storageService.deleteItem(StorageKeys.User);

        return new Promise((resolve) => {
            resolve(true);
        });
    }

    getUserInfo(): IUserInfo {
        return this.storageService.getItem(StorageKeys.User) as IUserInfo;
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
