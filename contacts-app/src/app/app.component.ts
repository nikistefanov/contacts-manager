import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, take, tap } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isLoading: boolean = false;

    constructor(public authService: AuthService, private router: Router) {}

    logout() {
        this.isLoading = true;
        this.authService.logout().pipe(
            take(1),
            debounceTime(1000),
            tap(loggedOut => {
                if (loggedOut) {
                    this.router.navigate([""]);
                }

                this.isLoading = false;
            })
        )
    }
}
