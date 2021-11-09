import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { wait } from './shared/utilities/promise-helpers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
    isLoading: boolean = false;

    constructor(public authService: AuthService, private router: Router) {}

    async logout() {
        this.isLoading = true;
        const loggedOut = await this.authService.logout();
        await wait(1000)

        if (loggedOut) {
            this.router.navigate([""]);
        }

        this.isLoading = false;
    }
}
