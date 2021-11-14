import { IContact } from "./contact";

export interface IContactCreateDialogData {
    label: string;
    contact?: IContact;
}

export interface IDeleteConfirmation {
    message: string;
}
