import { IUser, IUserInfo } from "../app/shared/models/user"

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

export const USER: IUser = {
    id: 1,
    username: "joe",
    email: "joe@doe.com",
    password: "password"
};

export class LocalStorageServiceMock {
    private data: any = {};

    setItem(key: string, value: Object) {
        this.data[key] = value;
    }

    getItem(key: string) {
        return this.data[key];
    }

    deleteItem(key: string) {
        delete this.data[key];
    }
}
