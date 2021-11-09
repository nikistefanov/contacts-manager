import { Injectable } from '@angular/core';
import axios from 'axios';
import { CONTACTS_API, CONTACTS_API_USER_FILTER } from '../../constants/api';
import { IContact } from '../../models/contact';
import { IUserInfo } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

    getAll(userInfo: IUserInfo) {
        return axios.get<IContact>(CONTACTS_API, {
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }

    getAllByUser(userInfo: IUserInfo) {
        return axios.get<IContact[]>(`${CONTACTS_API_USER_FILTER}${userInfo.user.id}`, {
            headers: {
                Authorization: `Bearer ${userInfo.jwt}`
            }
        })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }

    getSingle(contactId: number, userInfo: IUserInfo) {
        return axios.get<IContact>(`${CONTACTS_API}/${contactId}`, {
                headers: {
                    Authorization: `Bearer ${userInfo.jwt}`
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }

    create(contact: IContact, userInfo: IUserInfo) {
        return axios
            .post<IContact>(CONTACTS_API, {
                firstName: contact.firstName,
                surname: contact.surname,
                DOB: contact.DOB,
                address: contact.address,
                phoneNumber: contact.phoneNumber,
                IBAN: contact.IBAN,
                userId: userInfo.user.id
            }, {
                headers: {
                    Authorization: `Bearer ${userInfo.jwt}`,
                }
            })
            .then(response => {
                return response.data;
            })
            .catch(error => {
                throw error.response;
            });
    }

    async delete(contactId: number | undefined, userInfo: IUserInfo) {
        const canDelete = await this.canDelete(contactId, userInfo);

        if (canDelete) {
            return axios
                .delete<IContact>(`${CONTACTS_API}/${contactId}`, {
                    headers: {
                        Authorization: `Bearer ${userInfo.jwt}`,
                    }
                })
                .then(response => {
                    return response.data;
                })
                .catch(error => {
                    throw error.response;
                });
        } else {
            throw new Error("No permission for this operation")!
        }
    }

    private async canDelete(contactId: number | undefined, userInfo: IUserInfo) {
        if (!contactId) {
            return false;
        }

        const contact = await this.getSingle(contactId, userInfo);

        if (contact && contact.userId === userInfo.user.id) {
            return true;
        }

        return false;
    }
}
