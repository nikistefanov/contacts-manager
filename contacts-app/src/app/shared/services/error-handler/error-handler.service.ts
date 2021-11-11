import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    durationInSeconds = 2000;

    constructor(private snackBar: MatSnackBar) { }

    public handleError(errorData: any) {
        const messege = this.getErrorMessege(errorData);

        this.openSnackBar(messege)
    }

    private getErrorMessege(errorData: any) {
        const messege = errorData?.error?.data[0]?.messages[0]?.message

        return messege;
    }

    private openSnackBar(messege: string) {
        this.snackBar.open(messege, "", {
            duration: this.durationInSeconds,
            panelClass: ["bg-red-500", "text-white"],
            verticalPosition: "top"
        });
    }
}
