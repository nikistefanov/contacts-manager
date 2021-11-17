import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { IUserInfo } from '../../../../shared/models/user';
import { MatDialog } from '@angular/material/dialog';
import { ContactCreateComponent } from '../contact-create/contact-create.component';
import { AuthService } from '../../../auth/auth.service';
import { delay, first } from "rxjs";
import { IContactCreateDialogData, IConfirmationDialogData } from '../../../../shared/models/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { ConfirmComponent } from '../../../../shared/components/dialog/confirm/confirm.component';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CONTACTS_COLUMNS_MAP, CONTACTS_HEADERS_MAP } from '../../../../shared/utilities/contact-helpers';
import { RootService } from '../../../http/root.service';
import { LOADING_TIME } from '../../../../shared/constants/contacts';

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
            delay(LOADING_TIME)
        ).subscribe({
            next: (contacts: IContact[]) => {
                this.setupTable(contacts);

                this.isLoading = false;
            },
            error: error => this.errorHandler.handleError(error)
        });
    }

    onDelete(event: Event, contact: IContact) {
        event.stopImmediatePropagation();
        const data: IConfirmationDialogData = {
            message: `Are you sure want to delete <b class="whitespace-nowrap">${contact.firstName} ${contact.surname}</b> from your contact list`,
            buttonColor: "warn"
        }
        this.openDialog(data, ConfirmComponent, this.deleteContact.bind(this, contact));
    }

    onUpdateContact(event: Event, contact: IContact) {
        event.stopImmediatePropagation();
        const contactData = Object.assign({}, contact);
        this.openDialog({ label: "Update", contact: contactData }, ContactCreateComponent, this.updateContact.bind(this), contactData.id);
    }

    onCreateContact() {
        this.openDialog({ label: "Create" }, ContactCreateComponent, this.createContact.bind(this))
    }

    private deleteContact(contact: IContact) {
        this.rootService.contacts.delete(contact.id).pipe(
            first()
        ).subscribe((resp: IContact) => {
            this.contacts.splice(this.contacts.findIndex(i => i.id === resp.id), 1);
            this.dataSource.data = this.contacts;
        });
    }

    private openDialog(dialogData: IContactCreateDialogData | IConfirmationDialogData, component: ComponentType<ContactCreateComponent | ConfirmComponent>, cb: Function, updateContactId?: number) {
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
            first()
        ).subscribe({
            next: (resp: IContact) => {
                const index = this.contacts.findIndex(c => c.id === resp.id);
                this.contacts[index] = resp;
                this.dataSource.data = this.contacts;
            },
            error: error => this.errorHandler.handleError(error)
        });
    }

    private createContact(contact: IContact) {
        this.rootService.contacts.create(contact, this.userInfo.user.id).pipe(
            first()
        ).subscribe({
            next: (resp: IContact) => {
                this.contacts.push(resp);
                this.dataSource.data = this.contacts;
                this.paginator.lastPage();
            },
            error: error => this.errorHandler.handleError(error)
        });
    }

    private setupTable(contacts: IContact[]) {
        this.contacts = contacts;
        this.dataSource = new MatTableDataSource<IContact>(contacts);
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
    }
}
