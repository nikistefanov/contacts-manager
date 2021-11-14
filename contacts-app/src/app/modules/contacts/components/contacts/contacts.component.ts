import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { IUserInfo } from '../../../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { AuthService } from '../../../auth/auth.service';
import { delay, first, tap } from "rxjs";
import { IContactCreateDialogData, IDeleteConfirmation } from '../../../../shared/models/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ConfirmDeleteComponent } from '../../../../shared/components/dialog/confirm-delete/confirm-delete.component';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CONTACTS_COLUMNS_MAP, CONTACTS_HEADERS_MAP } from '../../../../shared/utilities/contact-helpers';
import { RootService } from '../../../http/root.service';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit {
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatTable, { static: false }) table!: MatTable<IContact>;

    public userInfo!: IUserInfo;
    public isLoading: boolean = true;
    public contactHeaders: string[];
    public contactColumns: string[];
    public dataSource!: MatTableDataSource<IContact>;
    public expandedContact!: IContact;

    private contacts!: IContact[];

    constructor(private authService: AuthService,
                private rootService: RootService,
                private dialog: MatDialog,
                private errorHandler: ErrorHandlerService) {
        this.contactHeaders = CONTACTS_HEADERS_MAP;
        this.contactColumns = CONTACTS_COLUMNS_MAP;
    }

    ngOnInit() {
        this.userInfo = this.authService.getUserInfo();
        this.rootService.contacts.getAllByUser(this.userInfo.user.id).pipe(
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
            message: `Are you sure want to delete <b class="whitespace-nowrap">${contact.firstName} ${contact.surname}</b> from your contact list`
        }
        this.openDialog(data, ConfirmDeleteComponent, this.deleteContact.bind(this, contact));
    }

    onUpdateContact(contact: IContact) {
        const contactData = Object.assign({}, contact);
        this.openDialog({ label: "Update", contact: contactData }, ContactCreateComponent, this.updateContact.bind(this), contactData.id);
    }

    onCreateContact() {
        this.openDialog({ label: "Create" }, ContactCreateComponent, this.createContact.bind(this))
    }

    private deleteContact(contact: IContact) {
        this.rootService.contacts.delete(contact.id).pipe(
            first()
        ).subscribe(() => {
            this.contacts.splice(this.contacts.findIndex(i => i.id === contact.id), 1);
            this.dataSource.data = this.contacts;
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
        this.rootService.contacts.update(contact, updateContactId, this.userInfo.user.id).pipe(
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
        this.rootService.contacts.create(contact, this.userInfo.user.id).pipe(
            first(),
            tap({
                next: response => {
                    this.contacts.push(response);
                    this.dataSource.data = this.contacts;
                    this.paginator.lastPage();
                },
                error: error => {
                    this.errorHandler.handleError(error);
                }
            })
        ).subscribe();
    }

    private setupTable(contacts: IContact[]) {
        this.contacts = contacts;
        this.dataSource = new MatTableDataSource<IContact>(contacts);
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }
}
