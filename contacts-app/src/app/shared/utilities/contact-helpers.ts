import { IContact } from "../models/contact";

export function getEmptyContactValues(): IContact {
    return {
        id: undefined,
        firstName: undefined,
        surname: undefined,
        DOB: undefined,
        address: undefined,
        phoneNumber: undefined,
        IBAN: undefined,
        userId: undefined
    }
}

export const CONTACTS_HEADERS_MAP = [
    "First name",
    "Surname",
    "Date of birth",
    "Address",
    "Phone number",
    "IBAN",
    "Action"
]

export const CONTACTS_COLUMNS_MAP = [
    "firstName",
    "surname",
    "DOB",
    "address",
    "phoneNumber",
    "IBAN",
    "actions"
]
