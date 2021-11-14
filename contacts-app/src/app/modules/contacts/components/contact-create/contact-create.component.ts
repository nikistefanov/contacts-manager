import { Component, Inject, Input } from '@angular/core';
import { IContact } from '../../../../shared/models/contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IUserInfo } from '../../../../shared/models/user';
import { AuthService } from '../../../auth/auth.service';
import { getEmptyContactValues } from '../../../../shared/utilities/contact-helpers';
import { IContactCreateDialogData } from '../../../../shared/models/dialog';

@Component({
    selector: 'app-contact-create',
    templateUrl: './contact-create.component.html'
})
export class ContactCreateComponent  {
    public dialogData: IContactCreateDialogData;
    public formDataModel: IContact = getEmptyContactValues();

    private userInfo: IUserInfo;

    constructor(
        public dialogRef: MatDialogRef<ContactCreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IContactCreateDialogData,
        private authService: AuthService
    ) {
        this.dialogData = data;

        if (data.contact) {
            this.formDataModel = data.contact
        }

        this.userInfo = this.authService.getUserInfo();

    }

    saveContact(contact: IContact) {
        contact.userId = this.userInfo.user.id;

        this.dialogRef.close(contact);
    }

    onCancel() {
        this.dialogRef.close();
    }
}

