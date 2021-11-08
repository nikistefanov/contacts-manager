import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, take, tap } from 'rxjs';
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

    login(user: IUser): void {
        // this.authService.login(user)
        this.authService.login(user).pipe(
            take(1),
            debounceTime(1000),
            tap((userInfo: IUserInfo) => {
                if (userInfo) {
                    this.storageService.setItem(StorageKeys.User, userInfo);
                    this.router.navigate([""]);
                }
            }, error => {
                console.log(error);

            })
        )
    }

}
