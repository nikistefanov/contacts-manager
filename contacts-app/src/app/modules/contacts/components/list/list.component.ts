import { Component, OnInit } from '@angular/core';
import { IUserInfo } from '../../../../shared/models/user';
import { ContactsService } from '../../../../shared/services/contacts/contacts.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    constructor(public contactService: ContactsService, private storageService: LocalStorageService) {}

    async ngOnInit() {
        const userInfo = this.storageService.getItem(StorageKeys.User) as IUserInfo;
        const contacts = await this.contactService.getAllByUser(userInfo.user.id);

        console.log(contacts);

    }

}
