import { Component, OnInit } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { IUserInfo } from '../../../../shared/models/user';
import { ContactsService } from '../../../../shared/services/contacts/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactCreateComponent, IContactCreateDialogData } from '../contact-create/contact-create.component';
import { AuthService } from '../../../../shared/services/auth/auth.service';


@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    private userInfo: IUserInfo;
    public contacts: IContact[];
    typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

    constructor(public authService: AuthService, public contactService: ContactsService, public dialog: MatDialog) { }

    async ngOnInit() {
        this.userInfo = this.authService.getUserInfo();

        this.contacts = await this.contactService.getAllByUser(this.userInfo);
    }

    createEditContact(contact?: IContact) {
        const dialogData: IContactCreateDialogData = {
            buttonLabel: contact ? "Save" : "Create",
            ...(contact && { contact })
        };
        const dialogRef = this.dialog.open(ContactCreateComponent, {
            data: dialogData
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateOrCreateContact(result, contact?.id);
            }
        });
    }

    async deleteContact(contact: IContact) {
        try {
            await this.contactService.delete(contact.id, this.userInfo)

            this.contacts.splice(this.contacts.findIndex(i => i.id === contact.id), 1)
        } catch (error) {
            alert(error)
        }
    }

    private updateOrCreateContact(contact: IContact, updateContactId?: number) {
        if (updateContactId) {
            this.tryUpdateContact(contact, updateContactId);
        } else {
            this.tryCreateContact(contact);
        }
    }

    private async tryUpdateContact(contact: IContact, updateContactId: number) {
        try {
            const updatedContact = await this.contactService.update(contact, updateContactId, this.userInfo);
            const index = this.contacts.findIndex(c => c.id === updatedContact.id);

            this.contacts[index] = updatedContact;
        } catch (error) {
            console.log(error);

        }
    }

    private async tryCreateContact(contact: IContact) {
        try {
            const newContact = await this.contactService.create(contact, this.userInfo);

            this.contacts.push(newContact);
        } catch (error: any) {
            alert(error.data.message[0].messages[0].message)
        }
    }
}
