import { of } from "rxjs";
import { IContact } from "../app/shared/models/contact";
import { IStorage } from "../app/shared/models/storage";
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

export const USER_MOCK: IUser = {
    id: 1,
    username: "joe",
    email: "joe@doe.com",
    password: "password"
};

export class StorageServiceMock implements IStorage {
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

export function getContactsMock(count: number = 1): IContact[] {
    const contacts: IContact[] = [];

    for (let i = 1; i <= count; i++) {
        const contact: IContact = {
            id: i,
            firstName: `First${i}`,
            surname: `Last${i}`,
            DOB: new Date(),
            IBAN: i * 1000,
            phoneNumber: i * 1000,
            userId: i
        }

        contacts.push(contact);
    }

    return contacts;
}

export class ContactCreateDialogMock {

    open() {
      return {
        afterClosed: () => of(getContactsMock(1))
      };
    }
  };
