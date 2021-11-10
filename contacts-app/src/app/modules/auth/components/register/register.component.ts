import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first, take, tap } from 'rxjs';
import { IUser, IUserInfo, IUserRegistration } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    password: FormControl;
    confirmPassword: FormControl;
    constructor(private authService: AuthService, private router: Router, private storageService: LocalStorageService) {}

    async register(data: IUserRegistration) {
        try {
            const user: IUser = {
                username: data.username,
                email: data.email,
                password: data.passwords.password
            }
            const response = await this.authService.register(user) as IUserInfo;

            this.storageService.setItem(StorageKeys.User, response);
            this.router.navigate([""]);
        } catch (error: any) {
            alert(error.data.message[0].messages[0].message)
        }
    }

    getError(errors: any) {
        console.log(errors);

    }
}
