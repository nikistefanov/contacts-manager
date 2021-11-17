import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export const DEFAULT_ERROR_MESSAGE = "Unexpected error";

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService {
    durationInSeconds = 2000;

    constructor(private snackBar: MatSnackBar) { }

    public handleError(errorData: any) {
        const message = this.getErrormessage(errorData);

        this.openSnackBar(message)
    }

    private getErrormessage(errorData: any) {
        let errorMessage = DEFAULT_ERROR_MESSAGE;
        if (!errorData || !errorData.error || !errorData.error.message) {
            return errorMessage;
        }

        if (!Array.isArray(errorData.error.message)) {
            errorMessage = errorData.error.message;
        } else if (errorData.error.message[0]?.messages[0]?.message) {
            errorMessage = errorData.error.message[0].messages[0].message;
        }

        return errorMessage;
    }

    private openSnackBar(message: string) {
        this.snackBar.open(message, "", {
            duration: this.durationInSeconds,
            panelClass: ["bg-red-500", "text-white"],
            verticalPosition: "top"
        });
    }
}
