export interface IStorage {
    getItem(key: string): any;
    setItem(key: string, value: Object): void;
    deleteItem(key: string): void;
}
