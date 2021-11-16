import { ThemePalette } from "@angular/material/core";
import { IContact } from "./contact";

export interface IContactCreateDialogData {
    label: string;
    contact?: IContact;
}

export interface IConfirmationDialogData {
    message: string;
    buttonColor: ThemePalette;
}
