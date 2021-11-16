import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { Location } from "@angular/common";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ContactsComponent } from "./contacts.component";
import { ACTIVE_USER_INFO, StorageServiceMock } from "../../../../../test-helpers/mocks";
import { StorageService } from "../../../../shared/services/storage/storage.service";
import { Router } from "@angular/router";
import { SpyLocation } from "@angular/common/testing";
import { appRoutes } from "../../../../app-routing.module";
import { ContactsModule } from "../../contacts.module";
import { authRoutes } from "../../../auth/auth-routing.module";
import { contactsRoutes } from "../../../contacts/contacts-routing.module";
import { RoutePaths } from "../../../../shared/constants/route-paths";
import { StorageKeys } from "../../../../shared/constants/storage";
import { API_BASE } from "../../../../shared/constants/api";
import { CONTACTS_API } from "../../../http/services/contacts.service";
import { IContact } from "../../../../shared/models/contact";

fdescribe("ContactsComponent", () => {
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

    it("should show empty screen", fakeAsync(() => {
        mockContacts();
        debugger;
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

    function mockContacts(contacts: IContact[] = []) {
        storageService.setItem(StorageKeys.User, ACTIVE_USER_INFO);

        component.ngOnInit();
        const req: TestRequest = httpTestingController.expectOne(`${API_BASE}${CONTACTS_API}?_limit=-1&userId=${ACTIVE_USER_INFO.user.id}`);
        expect(req.request.method).toBe("GET");
        wait(1000);
        req.flush(contacts);
        wait(1000);
    }

    function wait(ms?: number) {
        tick(ms);
        fixture.detectChanges();
    }
});
