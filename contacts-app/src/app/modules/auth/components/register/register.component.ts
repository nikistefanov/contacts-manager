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
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
    formDataModel: IUser = getDefaultUserValues();

    constructor(private authService: AuthService, private router: Router, private storageService: StorageService, private errorHandler: ErrorHandlerService) {}

    register(user: IUser) {
        this.authService.register(user).pipe(
            first()
        ).subscribe({
            next: (resp: IUserInfo) => {
                this.storageService.setItem(StorageKeys.User, resp);
                this.router.navigateByUrl(RoutePaths.Base);
            },
            error: error => this.errorHandler.handleError(error)
        });
    }
}
