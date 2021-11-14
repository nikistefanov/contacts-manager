import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { ApiService } from './api.service';
import { ContactsService } from './services/contacts.service';

@Injectable({
    providedIn: 'root'
})
export class RootService extends ApiService {
    contacts: ContactsService;

    constructor(http: HttpClient, auth: AuthService) {
        super(http, auth);

        this.contacts = new ContactsService(http, auth);
    }
}
