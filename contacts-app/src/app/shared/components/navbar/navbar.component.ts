import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { wait } from '../../utilities/promise-helpers';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    isLoading: boolean = false;

    constructor(public authService: AuthService, private router: Router) { }

    async logout() {
        this.isLoading = true;
        const loggedOut = await this.authService.logout();

        if (loggedOut) {
            this.router.navigate([""]);
            await wait(1000)
        }

        this.isLoading = false;
    }

}
