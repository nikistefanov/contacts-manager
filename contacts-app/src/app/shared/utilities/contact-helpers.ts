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
