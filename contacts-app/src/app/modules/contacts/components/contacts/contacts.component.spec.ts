import { ComponentFixture, fakeAsync, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Location } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ContactsComponent } from "./contacts.component";
import { StorageServiceMock } from "../../../../../test-helpers/mocks";
import { StorageService } from "../../../../shared/services/storage/storage.service";
import { Router } from "@angular/router";
import { SpyLocation } from "@angular/common/testing";
import { appRoutes } from "../../../../app-routing.module";
import { ContactsModule } from "../../contacts.module";
import { authRoutes } from "../../../auth/auth-routing.module";
import { contactsRoutes } from "../../../contacts/contacts-routing.module";

xdescribe("ContactsComponent", () => {
    let component: ContactsComponent;
    let fixture: ComponentFixture<ContactsComponent>;
    let storageService: StorageServiceMock;
    let router: Router;
    let httpTestingController: HttpTestingController;
    // let authService: AuthService;
    let location: Location;

    beforeEach(fakeAsync(() => {
        setup();
    }));

    afterEach(fakeAsync(() => {
        httpTestingController.verify();
    }));

    it("should update user storage info and navigate the user to contacts when successful login", fakeAsync(() => {
        // component.login(USER);
        // const req: TestRequest = httpTestingController.expectOne(AUTH_LOGIN);
        // expect(req.request.method).toBe("POST");

        // req.flush(ACTIVE_USER_INFO);
        // tick();

        // expect(storageService.getItem(StorageKeys.User)).toBe(ACTIVE_USER_INFO);
        // expect(location.path()).toBe(RoutePaths.Contacts);
    }));

    function setup() {
        storageService = new StorageServiceMock();

        TestBed.configureTestingModule({
            declarations: [
                ContactsComponent
            ],
            imports: [
                ContactsModule,
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
        // authService = TestBed.inject(AuthService);
        fixture = TestBed.createComponent(ContactsComponent);
        component = fixture.componentInstance;
    }
});
