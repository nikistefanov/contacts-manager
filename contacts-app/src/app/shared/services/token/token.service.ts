import { Injectable } from '@angular/core';
import { ITokenData } from '../../models/token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  decode(token: string): ITokenData {
    return JSON.parse(atob(token.split('.')[1]));
  }

  convertUnixToDate(exp: number): Date {
      return new Date(exp * 1000);
  }
}
