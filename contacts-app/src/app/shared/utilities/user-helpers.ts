import { IUser } from "../models/user";

export function getDefaultUserValues(): IUser {
    return {
        id: 0,
        username: "",
        email: "",
        password: ""
    }
}
