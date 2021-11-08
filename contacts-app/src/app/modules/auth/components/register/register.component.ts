import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { first, take, tap } from 'rxjs';
import { IUser } from '../../../../shared/models/user';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { LocalStorageService, StorageKeys } from '../../../../shared/services/local-storage/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    constructor(private authService: AuthService, private router: Router, private storageService: LocalStorageService) {}

    register(user: IUser) {
        this.authService.register(user).pipe(
            take(1),
            tap(res => {
                this.storageService.setItem(StorageKeys.User, res);
                this.router.navigate([""]);
            }, error => {
                // alert(error.error.data[0].messages[0].message)
                alert(error);
            })
        ).subscribe()
    }
}
