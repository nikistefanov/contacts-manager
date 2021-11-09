import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser, IUserInfo } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(private authService: AuthService, private storageService: LocalStorageService, private router: Router) { }

    async login(user: IUser) {
        try {
            const response = await this.authService.login(user) as IUserInfo;

            this.storageService.setItem(StorageKeys.User, response);
            this.router.navigate([""]);
        } catch (error: any) {
            alert(error.data.message[0].messages[0].message)
        }
    }

}
