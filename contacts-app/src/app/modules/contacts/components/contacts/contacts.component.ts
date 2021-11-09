import { Component, OnInit } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { IUserInfo } from '../../../../shared/models/user';
import { ContactsService } from '../../../../shared/services/contacts/contacts.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';


@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    private userInfo: IUserInfo;
    public contacts: IContact[];
    typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

    constructor(public contactService: ContactsService, private storageService: LocalStorageService) {}

    async ngOnInit() {
        this.userInfo = this.storageService.getItem(StorageKeys.User) as IUserInfo;

        if (!this.userInfo) {
            return;
        }

        this.contacts = await this.contactService.getAllByUser(this.userInfo);
    }

    async createContact(contact?: IContact) {
        // try {
        //     const newContact = await this.contactService.create(contact, this.userInfo);
        //     this.contacts.push(newContact);
        // } catch (error: any) {
        //     alert(error.data.message[0].messages[0].message)
        // }
    }

    async deleteContact(contact: IContact) {
        try {
            await this.contactService.delete(contact.id, this.userInfo)

            this.contacts.splice(this.contacts.findIndex(i => i.id === contact.id), 1)
        } catch (error) {
            alert(error)
        }
    }
}
