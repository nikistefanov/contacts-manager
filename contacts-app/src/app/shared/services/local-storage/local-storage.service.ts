import { Injectable } from '@angular/core';

export enum StorageKeys {
    User = "user_info"
}

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    public getItem<T>(key: string): T {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    public setItem(key: string, value: Object) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public deleteItem(key: string) {
        localStorage.removeItem(key);
    }
}
