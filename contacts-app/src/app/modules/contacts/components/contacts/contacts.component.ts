import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { IUserInfo } from '../../../../shared/models/user';
import { ContactsService } from '../../../../shared/services/contacts/contacts.service';
import { MatDialog } from '@angular/material/dialog';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { delay, first, tap } from "rxjs";
import { IContactCreateDialogData, IDeleteConfirmation } from '../../../../shared/models/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ConfirmDeleteComponent } from '../../../../shared/components/dialog/confirm-delete/confirm-delete.component';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CONTACTS_COLUMNS_MAP, CONTACTS_HEADERS_MAP } from '../../../../shared/utilities/contact-helpers';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatTable, { static: false}) table!: MatTable<IContact>;

    public userInfo!: IUserInfo;
    public isLoading: boolean = true;
    public contactHeaders: string[];
    public contactColumns: string[];
    public dataSource!: MatTableDataSource<IContact>;
    public expandedContact!: IContact;

    private contacts!: IContact[];

    constructor(public authService: AuthService, public contactService: ContactsService, public dialog: MatDialog, private errorHandler: ErrorHandlerService) {
        this.contactHeaders = CONTACTS_HEADERS_MAP;
        this.contactColumns = CONTACTS_COLUMNS_MAP;
    }

    ngOnInit() {
        this.userInfo = this.authService.getUserInfo();
        this.contactService.getAllByUser(this.userInfo).pipe(
            first(),
            delay(1000),
            tap({
                next: contacts => {
                    this.setupTable(contacts);

                    this.isLoading = false;
                },
                error: error => {
                    this.errorHandler.handleError(error);
                }
            })
        ).subscribe();
    }

    onDelete(contact: IContact) {
        const data: IDeleteConfirmation = {
            messege: `Are you sure want to delete <b class="whitespace-nowrap">${contact.firstName} ${contact.surname}</b> from your contact list`
        }
        this.openDialog(data, ConfirmDeleteComponent, this.deleteContact.bind(this, contact));
    }

    onUpdateContact(contact: IContact) {
        const contactData = Object.assign({}, contact);
        this.openDialog({label: "Update", contact: contactData}, ContactCreateComponent, this.updateContact.bind(this), contactData.id);
    }

    onCreateContact() {
        this.openDialog({label: "Create"}, ContactCreateComponent, this.createContact.bind(this))
    }

    private deleteContact(contact: IContact) {
        this.contactService.delete(contact.id, this.userInfo).pipe(
            first()
        ).subscribe(() => {
            this.contacts.splice(this.contacts.findIndex(i => i.id === contact.id), 1)
        });
    }

    private openDialog(dialogData: IContactCreateDialogData | IDeleteConfirmation, component: ComponentType<ContactCreateComponent | ConfirmDeleteComponent>, cb: Function, updateContactId?: number) {
        const dialogRef = this.dialog.open(component, {
            data: dialogData,
            panelClass: ["w-full", "md-lg:w-7/12"]
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
                    this.dataSource.data = this.contacts;
                },
                error: error => {
                    this.errorHandler.handleError(error);
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
                    this.errorHandler.handleError(error);
                }
            })
        ).subscribe();
    }

    private setupTable(contacts: IContact[]) {
        this.dataSource = new MatTableDataSource<IContact>(contacts);
        this.contacts = contacts;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }
}
