import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { ContactsComponent } from "./contacts.component";
import { ACTIVE_USER_INFO, ContactCreateDialogMock, getContactsMock, StorageServiceMock } from "../../../../../test-helpers/mocks";
import { StorageService } from "../../../../shared/services/storage/storage.service";
import { appRoutes } from "../../../../app-routing.module";
import { authRoutes } from "../../../auth/auth-routing.module";
import { contactsRoutes } from "../../../contacts/contacts-routing.module";
import { StorageKeys } from "../../../../shared/constants/storage";
import { API_BASE } from "../../../../shared/constants/api";
import { CONTACTS_API } from "../../../http/services/contacts.service";
import { IContact } from "../../../../shared/models/contact";
import { By } from "@angular/platform-browser";
import { MaterialModule } from "../../../material/material.module";
import { SharedModule } from "../../../../shared/shared.module";
import { ContactCreateComponent } from "../contact-create/contact-create.component";
import { DebugElement } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { LOADING_TIME } from "../../../../shared/constants/contacts";

const NO_RESULST_SELECTOR = "[data-apptest='noResults']";
const NO_RESULST_HEADING_SELECTOR = `${NO_RESULST_SELECTOR} h2`;
const NO_RESULST_BUTTON_SELECTOR = `${NO_RESULST_SELECTOR} button`;
const CONTACTS_HEADING_SELECTOR = "h1";
const CONTACTS_ROW_SELECTOR = "tbody tr";
const CONTACTS_PAGES_COUNT_SELECTOR = ".mat-paginator-range-label";

describe("ContactsComponent", () => {
    let component: ContactsComponent;
    let fixture: ComponentFixture<ContactsComponent>;
    let storageService: StorageServiceMock;
    let httpTestingController: HttpTestingController;

    beforeEach(fakeAsync(() => {
        setup();
    }));

    afterEach(fakeAsync(() => {
        httpTestingController.verify();
    }));

    it("should show empty screen", fakeAsync(() => {
        mockContacts();

        verifyEmptyScreen();
    }));

    it("should create contact", fakeAsync(() => {
        const contact = getContactsMock(1)[0];

        mockContacts();
        verifyEmptyScreen();

        component.onCreateContact();

        const req: TestRequest = httpTestingController.expectOne(`${API_BASE}${CONTACTS_API}`);
        expect(req.request.method).toBe("POST");
        req.flush(contact);

        tick();
        fixture.detectChanges();

        verifyResultsScreen([contact]);
    }));

    it("should update contact", fakeAsync(() => {
        const contact = getContactsMock(1)[0];
        const modifiedContact = Object.assign(getContactsMock(1)[0], {firstName: "Updated"});

        mockContacts([contact]);
        verifyResultsScreen([contact]);

        component.onUpdateContact(new Event("click"), contact);
        const req: TestRequest = httpTestingController.expectOne(`${API_BASE}${CONTACTS_API}/${contact.id}`);
        expect(req.request.method).toBe("PUT");
        req.flush(modifiedContact);

        tick();
        fixture.detectChanges();

        verifyResultsScreen([modifiedContact]);
    }));

    it("should delete contact", fakeAsync(() => {
        const contact = getContactsMock(1)[0];

        mockContacts([contact]);
        verifyResultsScreen([contact]);

        component.onDelete(new Event("click"), contact);
        const req: TestRequest = httpTestingController.expectOne(`${API_BASE}${CONTACTS_API}/${contact.id}`);
        expect(req.request.method).toBe("DELETE");
        req.flush(contact);

        tick();
        fixture.detectChanges();

        verifyEmptyScreen();
    }));

    it("should show contact screen with contacts", fakeAsync(() => {
        const contacts = getContactsMock(3);
        mockContacts(contacts);

        verifyResultsScreen(contacts);
    }));

    function verifyEmptyScreen(visible: boolean = true) {
        let noResultsHeading;
        let noResultsButton;

        if (visible) {
            noResultsHeading = debugQueryHtmlElement(NO_RESULST_HEADING_SELECTOR);
            noResultsButton = debugQueryHtmlElement(NO_RESULST_BUTTON_SELECTOR);

            expect(noResultsHeading.innerText).toBe("No contacts added yet.");
            expect(noResultsButton.innerText).toContain("Add your first contact");
        } else {
            noResultsHeading = getDebugEl(NO_RESULST_HEADING_SELECTOR);
            noResultsButton = getDebugEl(NO_RESULST_BUTTON_SELECTOR);

            expect(noResultsHeading).toBeNull();
            expect(noResultsButton).toBeNull();
        }
    }

    function verifyResultsScreen(contacts: IContact[]) {
        verifyEmptyScreen(false);

        const heading = debugQueryHtmlElement(CONTACTS_HEADING_SELECTOR);
        expect(heading.innerText).toBe(`${ACTIVE_USER_INFO.user.username}'s Contacts`);

        const pages = debugQueryHtmlElement(CONTACTS_PAGES_COUNT_SELECTOR);
        expect(pages.innerText).toContain(`${contacts.length} of ${contacts.length}`);

        const rows = debugQueryAllHtmlElement(CONTACTS_ROW_SELECTOR);
        expect(rows.length).toEqual(contacts.length);

        for (let i = 0; i < rows.length; i++) {
            expect((rows[i].firstElementChild as HTMLElement).innerText).toContain(contacts[i].firstName as string);
        }
    }

    function setup() {
        storageService = new StorageServiceMock();

        TestBed.configureTestingModule({
            declarations: [
                ContactsComponent, ContactCreateComponent
            ],
            imports: [
                FormsModule,
                MaterialModule,
                SharedModule,
                RouterTestingModule.withRoutes([...appRoutes, ...contactsRoutes, ...authRoutes]),
                NoopAnimationsModule,
                HttpClientTestingModule],
            providers: [
                { provide: StorageService, useValue: storageService },
                { provide: MatDialog, useClass: ContactCreateDialogMock }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        fixture = TestBed.createComponent(ContactsComponent);
        component = fixture.componentInstance;
    }

    function mockContacts(contacts: IContact[] = []) {
        storageService.setItem(StorageKeys.User, ACTIVE_USER_INFO);
        fixture.detectChanges();

        const req: TestRequest = httpTestingController.expectOne(`${API_BASE}${CONTACTS_API}?_limit=-1&userId=${ACTIVE_USER_INFO.user.id}`);
        expect(req.request.method).toBe("GET");
        req.flush(contacts);

        tick(LOADING_TIME);
        fixture.detectChanges();
    }

    function getDebugEl(selector: string) {
        const debugEl = fixture.debugElement.query(By.css(selector));

        return debugEl;
    }

    function debugQueryHtmlElement(selector: string, debugElement: DebugElement = fixture.debugElement): HTMLElement {
        const el = debugElement.query(By.css(selector));

        return el.nativeElement as HTMLElement;
    }

    function debugQueryAllHtmlElement(selector: string, debugElement: DebugElement = fixture.debugElement): HTMLElement[] {
        const els = debugElement.queryAll(By.css(selector));
        const elsNative: HTMLElement[] = []

        els.forEach(el => {
            expect(el).toBeDefined();
            elsNative.push(el.nativeElement as HTMLElement);
        });

        return elsNative;
    }
 });
