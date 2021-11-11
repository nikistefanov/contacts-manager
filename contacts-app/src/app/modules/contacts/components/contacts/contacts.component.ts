import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { IUserInfo } from '../../../../shared/models/user';
import { ContactsService } from '../../../../shared/services/contacts/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { delay, first, tap } from "rxjs";
import { IContactCreateDialogData, IDeleteConfirmation } from '../../../../shared/models/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ContactDeleteComponent } from '../contact-delete/contact-delete.component';
import { CONTACTS_HEADERS_MAP } from '../../../../shared/constants/contacts';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit {
    public userInfo!: IUserInfo;
    public contacts!: IContact[];
    public isLoading: boolean = true;
    public contactsHeaders: string[] = CONTACTS_HEADERS_MAP;

    constructor(public authService: AuthService, public contactService: ContactsService, public dialog: MatDialog) { }

    ngOnInit() {
        this.userInfo = this.authService.getUserInfo();
        this.contactService.getAllByUser(this.userInfo).pipe(
            first(),
            delay(1000),
            tap({
                next: contacts => {
                    this.contacts = contacts;
                    this.isLoading = false;
                },
                error: error => {
                    alert(error.data.message[0].messages[0].message)
                }
            })
        ).subscribe();
    }

    onDelete(contact: IContact) {
        const data: IDeleteConfirmation = {
            messege: `Are you sure want to delete <b class="whitespace-nowrap">${contact.firstName} ${contact.surname}</b> from your contact list`
        }
        this.openDialog(data, ContactDeleteComponent, this.deleteContact.bind(this, contact));
    }

    onUpdateContact(contact: IContact) {
        const contactData = Object.assign({}, contact);
        this.openDialog({label: "Update", contact: contactData}, ContactCreateComponent, this.updateContact.bind(this), contactData.id);
    }

    onCreateContact() {
        this.openDialog({label: "Create"}, ContactCreateComponent, this.createContact.bind(this))
    }

    objectKeys(obj: Object) {
        return Object.keys(obj);
    }

    private deleteContact(contact: IContact) {
        this.contactService.delete(contact.id, this.userInfo).pipe(
            first()
        ).subscribe(() => {
            this.contacts.splice(this.contacts.findIndex(i => i.id === contact.id), 1)
        });
    }

    private openDialog(dialogData: IContactCreateDialogData | IDeleteConfirmation, component: ComponentType<ContactCreateComponent | ContactDeleteComponent>, cb: Function, updateContactId?: number) {
        const dialogRef = this.dialog.open(component, {
            data: dialogData,
            panelClass: "md:w-7/12"
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                cb(result, updateContactId);
            }
        });
    }

    private updateContact(contact: IContact, updateContactId: number) {
        this.contactService.update(contact, updateContactId, this.userInfo).pipe(
            first(),
            tap({
                next: contact => {
                    const index = this.contacts.findIndex(c => c.id === contact.id);

                    this.contacts[index] = contact;
                },
                error: error => {
                    alert(error.data.message[0].messages[0].message)
                }
            })
        ).subscribe();
    }

    private createContact(contact: IContact) {
        this.contactService.create(contact, this.userInfo).pipe(
            first(),
            tap({
                next: response => {
                    this.contacts.push(response);
                },
                error: error => {
                    alert(error.data.message[0].messages[0].message)
                }
            })
        ).subscribe();
    }
}
