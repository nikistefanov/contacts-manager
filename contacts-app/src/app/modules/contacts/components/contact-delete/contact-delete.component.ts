import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeleteConfirmation } from '../../../../shared/models/dialog';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.scss']
})
export class ContactDeleteComponent {
    public dialogData: IDeleteConfirmation;

    constructor(
        public dialogRef: MatDialogRef<ContactDeleteComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IDeleteConfirmation
    ) {
        this.dialogData = data;
    }

    onConfirm() {
        this.dialogRef.close(true);
    }

    onCancel() {
        this.dialogRef.close();
    }

}
