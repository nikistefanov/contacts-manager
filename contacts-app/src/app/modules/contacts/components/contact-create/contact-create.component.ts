import { Component, Inject, Input } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserInfo } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth/auth.service';

@Component({
    selector: 'app-contact-create',
    templateUrl: './contact-create.component.html',
    styleUrls: ['./contact-create.component.scss']
})
export class ContactCreateComponent  {
    @Input() dialogData: IContactCreateDialogData;
    private userInfo: IUserInfo;

    constructor(
        public dialogRef: MatDialogRef<ContactCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IContactCreateDialogData,
        private authService: AuthService
    ) {
        this.dialogData = data;
        this.userInfo = this.authService.getUserInfo();

    }

    saveContact(contact: IContact) {
        contact.userId = this.userInfo.user.id;

        this.dialogRef.close(contact);
    }
}

export interface IContactCreateDialogData {
    buttonLabel?: string;
    contact?: IContact;
}

