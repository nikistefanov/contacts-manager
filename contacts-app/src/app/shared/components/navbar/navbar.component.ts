import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import {first, tap} from "rxjs";
import {RoutePaths} from "../../constants/route-paths";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
    isLoading: boolean = false;

    constructor(public authService: AuthService, private router: Router) { }

    logout() {
        this.isLoading = true;

        this.authService.logout().pipe(
            first(),
            tap({
                next: response => {
                    this.router.navigate([RoutePaths.Base]);
                    this.isLoading = false;
                },
                error: error => {
                    this.isLoading = false;
                }
            })
        ).subscribe();
    }

}
