import { ITokenData } from "../models/token";

export function decodeToken(token: string): ITokenData {
    return JSON.parse(atob(token.split(".")[1]));
}

export function convertUnixToDate(exp: number): Date {
    return new Date(exp * 1000);
}
