import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/auth.service';
import { first } from "rxjs";
import { RoutePaths } from "../../constants/route-paths";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {
    isLoading: boolean = false;

    constructor(public authService: AuthService, private router: Router) { }

    logout() {
        this.isLoading = true;

        this.authService.logout().pipe(
            first()
        ).subscribe({
            next: () => {
                this.router.navigateByUrl(RoutePaths.Base);
                this.isLoading = false;
            },
            error: () => this.isLoading = false
        });
    }

}
