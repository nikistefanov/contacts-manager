import { Injectable } from '@angular/core';
import { IStorage } from '../../models/storage';

@Injectable({
    providedIn: 'root'
})
export class StorageService implements IStorage {
    private storageRef: any;

    constructor() {
        this.storageRef = localStorage;
    }

    public getItem<T>(key: string): T {
        const item =  this.storageRef.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    public setItem(key: string, value: Object) {
         this.storageRef.setItem(key, JSON.stringify(value));
    }

    public deleteItem(key: string) {
         this.storageRef.removeItem(key);
    }
}
