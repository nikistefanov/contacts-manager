import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { RoutePaths } from '../../../../shared/constants/route-paths';
import { IUser, IUserInfo } from '../../../../shared/models/user';
import { AuthService } from '../../auth.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { getDefaultUserValues } from '../../../../shared/utilities/user-helpers';
import { StorageKeys } from '../../../../shared/constants/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    formDataModel: IUser = getDefaultUserValues();

    constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private errorHandler: ErrorHandlerService) { }

    login(user: IUser) {
        this.authService.login(user).pipe(
            first()
        ).subscribe({
            next: (resp: IUserInfo) => {
                this.storageService.setItem(StorageKeys.User, resp);
                this.router.navigateByUrl(RoutePaths.Contacts);
            },
            error: (error) => this.errorHandler.handleError(error)
        })
    }

}
