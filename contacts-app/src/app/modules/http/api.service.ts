import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE } from '../../shared/constants/api';
import { AuthService } from '../auth/auth.service';

const API_URL = API_BASE;
const NO_LIMIT_PARAM = {"_limit": -1};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    constructor(private readonly http: HttpClient, private readonly authService: AuthService) {
    }

    protected getInternal<T>(relativeUrl: string, queryParams: { [key: string]: string | string[] | number | undefined } = {}): Observable<T> {
        const modifiedParams = Object.assign(NO_LIMIT_PARAM, queryParams);
        const params = this.mapToHttpParams(modifiedParams);

        return this.http.get<T>(`${API_URL}${relativeUrl}`, {
            params,
            headers: this.getHeaders()
        });
    }

    protected postInternal<T>(relativeUrl: string, body?: any): Observable<T> {
        return this.http.post<T>(`${API_URL}${relativeUrl}`, body, {
            headers: this.getHeaders()
        });
    }

    protected putInternal<T>(relativeUrl: string, body?: any): Observable<T> {
        return this.http.put<T>(`${API_URL}${relativeUrl}`, body, {
            headers: this.getHeaders()
        });
    }

    protected deleteInternal<T>(relativeUrl: string, queryParams: { [key: string]: string | string[] | number | undefined } = {}): Observable<T> {
        const params = this.mapToHttpParams(queryParams);

        return this.http.delete<T>(`${API_URL}${relativeUrl}`, {
            params,
            headers: this.getHeaders()
        });
    }

    private getHeaders(): HttpHeaders {
        const user = this.authService.getUserInfo();
        const token = user ? user.jwt : null;
        const headers = new HttpHeaders(token ? {"Authorization": `Bearer ${token}`} : {});

        return headers;
    }

    private mapToHttpParams(queryParams: { [key: string]: string | string[] | number | number[] | undefined } = {}): HttpParams | undefined {
        const keys = Object.keys(queryParams);
        if (keys.length === 0) {
            return undefined;
        }

        const params: { [key: string]: string } = {};
        keys.forEach(k => {
            const value = queryParams[k];
            if (value !== undefined) {
                params[k] = Array.isArray(value) ? value.join(",") : value.toString();
            }
        });

        return new HttpParams({ fromObject: params });
    }
}
