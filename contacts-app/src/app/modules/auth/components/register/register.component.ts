import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { RoutePaths } from '../../../../shared/constants/route-paths';
import { IUser } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';
import { getDefaultUserValues } from '../../../../shared/utilities/user-helpers';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    formDataModel: IUser = getDefaultUserValues()

    constructor(private authService: AuthService, private router: Router, private storageService: LocalStorageService) {}

    register(user: IUser) {
        this.authService.register(user).pipe(
            first(),
            tap({
                next: response => {
                    this.storageService.setItem(StorageKeys.User, response);
                    this.router.navigate([RoutePaths.Base]);
                },
                error: error => {
                    alert(error.data.message[0].messages[0].message)
                }
            })
        ).subscribe();
    }

    getError(errors: any) {
        console.log(errors);

    }
}
