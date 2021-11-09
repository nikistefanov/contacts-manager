import { Injectable } from '@angular/core';
import axios, { Method } from 'axios';
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
        return this.createEditContact(contact, userInfo);
    }

    async delete(contactId: number | undefined, userInfo: IUserInfo) {
        const canDelete = await this.canManageContact(contactId, userInfo);

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

    async update(newContact: IContact, updateContactId: number, userInfo: IUserInfo) {
        const canUpdate = await this.canManageContact(updateContactId, userInfo);

        if (canUpdate) {
            return this.createEditContact(newContact, userInfo, "PUT", `${CONTACTS_API}/${updateContactId}`);
        }
    }

    private createEditContact(contact: IContact, userInfo: IUserInfo, method: Method = "POST", url: string = CONTACTS_API) {
        return axios({
            method,
            url,
            responseType: "json",
            data: {
                firstName: contact.firstName,
                surname: contact.surname,
                DOB: contact.DOB,
                address: contact.address,
                phoneNumber: contact.phoneNumber,
                IBAN: contact.IBAN,
                userId: userInfo.user.id
            },
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

    private async canManageContact(contactId: number | undefined, userInfo: IUserInfo) {
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
