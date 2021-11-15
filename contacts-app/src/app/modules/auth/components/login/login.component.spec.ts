import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthModule } from "../../auth.module";
import { LoginComponent } from "./login.component";
import { ACTIVE_USER_INFO, AuthServiceMock, LocalStorageServiceMock, RouterMock } from "../../../../../test-helpers/mocks";
import { AuthService } from "../../auth.service";
import { IUser } from "../../../../shared/models/user";
import { LocalStorageService, StorageKeys } from "../../../../shared/services/local-storage/local-storage.service";
import { Router } from "@angular/router";
import { RoutePaths } from "../../../../shared/constants/route-paths";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let storageService: LocalStorageServiceMock;
    let router: Router;
    let authService: AuthServiceMock;

    it("should update user storage info and navigate the user to contacts", () => {
        const user: IUser = {
            id: 1,
            username: "joe",
            email: "joe@doe.com",
            password: "password"
        };

        setup();
        const routerSpy = spyOn(router, "navigateByUrl");

        component.login(user);

        expect(storageService.getItem(StorageKeys.User)).toBe(ACTIVE_USER_INFO)
        expect(routerSpy).toHaveBeenCalledWith(RoutePaths.Contacts);
    });

    function setup() {
        storageService = new LocalStorageServiceMock();
        authService = new AuthServiceMock(true, true);

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                AuthModule,
                RouterTestingModule.withRoutes([]),
                NoopAnimationsModule],
            providers: [
                { provide: AuthService, useValue: authService },
                { provide: LocalStorageService, useValue: storageService }
            ]
        });

        router = TestBed.get(Router);
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }
});
