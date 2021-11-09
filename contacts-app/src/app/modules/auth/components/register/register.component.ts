import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, take, tap } from 'rxjs';
import { IUser, IUserInfo } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    constructor(private authService: AuthService, private router: Router, private storageService: LocalStorageService) {}

    async register(user: IUser) {
        try {
            const response = await this.authService.register(user) as IUserInfo;

            this.storageService.setItem(StorageKeys.User, response);
            this.router.navigate([""]);
        } catch (error: any) {
            alert(error.data.message[0].messages[0].message)
        }
    }
}
