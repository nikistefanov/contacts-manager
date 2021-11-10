import { Component, OnInit } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { IUserInfo } from '../../../../shared/models/user';
import { ContactsService } from '../../../../shared/services/contacts/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactCreateComponent, IContactCreateDialogData } from '../contact-create/contact-create.component';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import {first, tap} from "rxjs";


@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    private userInfo!: IUserInfo;
    public contacts!: IContact[];
    public isLoading: boolean = true;

    constructor(public authService: AuthService, public contactService: ContactsService, public dialog: MatDialog) { }

    ngOnInit() {
        this.userInfo = this.authService.getUserInfo();
        this.contactService.getAllByUser(this.userInfo).pipe(
            first(),
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

    deleteContact(contact: IContact) {
        this.contactService.delete(contact.id, this.userInfo).pipe(
            first()
        ).subscribe(() => {
            this.contacts.splice(this.contacts.findIndex(i => i.id === contact.id), 1)
        });
    }

    private updateOrCreateContact(contact: IContact, updateContactId?: number) {
        if (updateContactId) {
            this.updateContact(contact, updateContactId);
        } else {
            this.createContact(contact);
        }
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
