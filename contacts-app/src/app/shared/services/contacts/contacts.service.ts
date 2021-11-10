import { Injectable } from '@angular/core';
import { CONTACTS_API, CONTACTS_API_USER_FILTER } from '../../constants/api';
import { IContact } from '../../models/contact';
import { IUserInfo } from '../../models/user';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ContactsService {

    constructor(private httpClient: HttpClient) {}

    getAllByUser(userInfo: IUserInfo) {
        return this.httpClient.get<IContact[]>(`${CONTACTS_API_USER_FILTER}${userInfo.user.id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`
            }
        });
    }

    getSingle(contactId: number, userInfo: IUserInfo): Observable<IContact> {
        return this.httpClient.get<IContact>(`${CONTACTS_API}/${contactId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`
            }
        });
    }

    create(contact: IContact, userInfo: IUserInfo): Observable<IContact> {
        return this.httpClient.post<IContact>(CONTACTS_API, {
            firstName: contact.firstName,
            surname: contact.surname,
            DOB: contact.DOB,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            IBAN: contact.IBAN,
            userId: userInfo.user.id
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`
            }
        });
    }

    delete(contactId: number | undefined, userInfo: IUserInfo) {
        return this.httpClient.delete(`${CONTACTS_API}/${contactId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`,
            }
        });
    }

    update(contact: IContact, updateContactId: number, userInfo: IUserInfo): Observable<IContact> {
        return this.httpClient.put<IContact>(`${CONTACTS_API}/${updateContactId}`, {
            firstName: contact.firstName,
            surname: contact.surname,
            DOB: contact.DOB,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            IBAN: contact.IBAN,
            userId: userInfo.user.id
        }, {
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`
            }
        });
    }
}
