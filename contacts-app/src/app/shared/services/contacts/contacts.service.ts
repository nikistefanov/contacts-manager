import { Injectable } from '@angular/core';
import axios from 'axios';
import { CONTACTS_API, CONTACTS_API_USER_FILTER } from '../../constants/api';
import { IContact } from '../../models/contact';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

    getAll() {
        return axios.get<IContact>(CONTACTS_API)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }

    getAllByUser(userId: number) {
        return axios.get<IContact>(`${CONTACTS_API_USER_FILTER}${userId}`)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }
}
