import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, tap } from 'rxjs';
import { RoutePaths } from '../../../../shared/constants/route-paths';
import { IUser } from '../../../../shared/models/user';
import { AuthService } from '../../auth.service';
import { ErrorHandlerService } from '../../../../shared/services/error-handler/error-handler.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';
import { getDefaultUserValues } from '../../../../shared/utilities/user-helpers';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent {
    formDataModel: IUser = getDefaultUserValues();

    constructor(private authService: AuthService, private storageService: LocalStorageService, private router: Router, private errorHandler: ErrorHandlerService) { }

    login(user: IUser) {
        this.authService.login(user).pipe(
            first(),
            tap({
                next: response => {
                    this.storageService.setItem(StorageKeys.User, response);
                    this.router.navigateByUrl(RoutePaths.Contacts);
                },
                error: error => {
                    this.errorHandler.handleError(error);
                }
            })
        ).subscribe();
    }

}
