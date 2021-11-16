import { Injectable } from '@angular/core';
import { IContact } from '../../../shared/models/contact';
import { Observable } from "rxjs";
import { ApiService } from '../api.service';

export const CONTACTS_API =  "/contacts";


@Injectable({
    providedIn: 'root'
})
export class ContactsService extends ApiService {

    getAllByUser(userId: number): Observable<IContact[]> {
        return this.getInternal<IContact[]>(CONTACTS_API, { "userId": `${userId}`});
    }

    create(contact: IContact, userId: number): Observable<IContact> {
        return this.postInternal<IContact>(CONTACTS_API, {
            firstName: contact.firstName,
            surname: contact.surname,
            DOB: contact.DOB,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            IBAN: contact.IBAN,
            userId: userId
        });
    }

    delete(contactId: number | undefined) {
        return this.deleteInternal<IContact>(`${CONTACTS_API}/${contactId}`);
    }

    update(contact: IContact, updateContactId: number, userId: number): Observable<IContact> {
        return this.putInternal<IContact>(`${CONTACTS_API}/${updateContactId}`, {
            firstName: contact.firstName,
            surname: contact.surname,
            DOB: contact.DOB,
            address: contact.address,
            phoneNumber: contact.phoneNumber,
            IBAN: contact.IBAN,
            userId: userId
        });
    }
}
