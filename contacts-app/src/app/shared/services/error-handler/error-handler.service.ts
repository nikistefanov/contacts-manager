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
        const fieldErrors = errorData?.error?.data?.errors;
        const serverError = errorData?.error?.data[0]?.messages[0].message;

        if (fieldErrors) {
            let message = "";
            Object.keys(fieldErrors).forEach(x => {
                message += `${fieldErrors[x]}. `;
            });

            return message;
        }

        if (serverError) {
            return serverError;
        }

        return DEFAULT_ERROR_MESSAGE;
    }

    private openSnackBar(message: string) {
        this.snackBar.open(message, "", {
            duration: this.durationInSeconds,
            panelClass: ["bg-red-500", "text-white"],
            verticalPosition: "top"
        });
    }
}
