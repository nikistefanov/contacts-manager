import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { Location } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthModule } from "../../auth.module";
import { RegisterComponent } from "./register.component";
import { ACTIVE_USER_INFO, LocalStorageServiceMock, USER } from "../../../../../test-helpers/mocks";
import { AuthService, AUTH_LOGIN, AUTH_REGISTER } from "../../auth.service";
import { LocalStorageService, StorageKeys } from "../../../../shared/services/local-storage/local-storage.service";
import { Router } from "@angular/router";
import { RoutePaths } from "../../../../shared/constants/route-paths";
import { SpyLocation } from "@angular/common/testing";
import { contactsRoutes } from "../../../contacts/contacts-routing.module";
import { authRoutes } from "../../auth-routing.module";
import { appRoutes } from "../../../../app-routing.module";

fdescribe("RegisterComponent", () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;
    let storageService: LocalStorageServiceMock;
    let router: Router;
    let httpTestingController: HttpTestingController;
    let authService: AuthService;
    let location: Location;

    beforeEach(fakeAsync(() => {
        setup();
    }));

    afterEach(fakeAsync(() => {
        httpTestingController.verify();
    }));

    it("should update user storage info and navigate the user to contacts when successful register", fakeAsync(() => {
        component.register(USER);
        const req: TestRequest = httpTestingController.expectOne(AUTH_REGISTER);
        expect(req.request.method).toBe("POST");

        req.flush(ACTIVE_USER_INFO);
        tick();

        expect(storageService.getItem(StorageKeys.User)).toBe(ACTIVE_USER_INFO);
        expect(location.path()).toBe(RoutePaths.Contacts);
    }));

    it("should throw an error when wrong credentials are passed", fakeAsync(() => {
        const errorSpy = spyOn((component as any).errorHandler, "handleError");

        component.register(USER);
        const req: TestRequest = httpTestingController.expectOne(AUTH_REGISTER);
        req.flush("error", {
            status: 400,
            statusText: "Bad request"
        });
        tick();

        expect(storageService.getItem(StorageKeys.User)).not.toBeDefined();
        expect(location.path()).toBe(RoutePaths.Register);
        expect(errorSpy).toHaveBeenCalled();
    }));

    function setup() {
        storageService = new LocalStorageServiceMock();

        TestBed.configureTestingModule({
            declarations: [
                RegisterComponent
            ],
            imports: [
                AuthModule,
                RouterTestingModule.withRoutes([...appRoutes, ...contactsRoutes, ...authRoutes]),
                NoopAnimationsModule,
                HttpClientTestingModule],
            providers: [
                { provide: Location, useClass: SpyLocation },
                { provide: LocalStorageService, useValue: storageService }
            ]
        });

        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        httpTestingController = TestBed.inject(HttpTestingController);
        authService = TestBed.inject(AuthService);
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
        router.navigateByUrl(RoutePaths.Register);
        tick();
    }
});
