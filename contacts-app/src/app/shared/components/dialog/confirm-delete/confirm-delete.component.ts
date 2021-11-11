import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeleteConfirmation } from '../../../models/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
    public dialogData: IDeleteConfirmation;

    constructor(
        public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
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
