import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { Location } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { LoginComponent } from "./login.component";
import { ACTIVE_USER_INFO, StorageServiceMock, USER_MOCK } from "../../../../../test-helpers/mocks";
import { AUTH_LOGIN } from "../../auth.service";
import { StorageService } from "../../../../shared/services/storage/storage.service";
import { Router } from "@angular/router";
import { RoutePaths } from "../../../../shared/constants/route-paths";
import { SpyLocation } from "@angular/common/testing";
import { contactsRoutes } from "../../../contacts/contacts-routing.module";
import { authRoutes } from "../../auth-routing.module";
import { appRoutes } from "../../../../app-routing.module";
import { StorageKeys } from "../../../../shared/constants/storage";
import { MaterialModule } from "../../../material/material.module";
import { SharedModule } from "../../../../shared/shared.module";
import { FormsModule } from "@angular/forms";

describe("LoginComponent", () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let storageService: StorageServiceMock;
    let router: Router;
    let httpTestingController: HttpTestingController;
    let location: Location;

    beforeEach(fakeAsync(() => {
        setup();
    }));

    afterEach(fakeAsync(() => {
        httpTestingController.verify();
    }));

    it("should update user storage info and navigate the user to contacts when successful login", fakeAsync(() => {
        component.login(USER_MOCK);
        const req: TestRequest = httpTestingController.expectOne(AUTH_LOGIN);
        expect(req.request.method).toBe("POST");

        req.flush(ACTIVE_USER_INFO);
        tick();

        expect(storageService.getItem(StorageKeys.User)).toBe(ACTIVE_USER_INFO);
        expect(location.path()).toBe(RoutePaths.Contacts);
    }));

    it("should throw an error when wrong credentials are passed", fakeAsync(() => {
        const errorSpy = spyOn((component as any).errorHandler, "handleError");

        component.login(USER_MOCK);
        const req: TestRequest = httpTestingController.expectOne(AUTH_LOGIN);
        req.flush("error", {
            status: 400,
            statusText: "Bad request"
        });
        tick();
        fixture.detectChanges();

        expect(storageService.getItem(StorageKeys.User)).not.toBeDefined();
        expect(location.path()).toBe(RoutePaths.Login);
        expect(errorSpy).toHaveBeenCalled();
    }));

    function setup() {
        storageService = new StorageServiceMock();

        TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                SharedModule,
                FormsModule,
                MaterialModule,
                RouterTestingModule.withRoutes([...appRoutes, ...contactsRoutes, ...authRoutes]),
                NoopAnimationsModule,
                HttpClientTestingModule],
            providers: [
                { provide: Location, useClass: SpyLocation },
                { provide: StorageService, useValue: storageService }
            ]
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;

        router.initialNavigation();
        tick();
        fixture.detectChanges();
    }
});
