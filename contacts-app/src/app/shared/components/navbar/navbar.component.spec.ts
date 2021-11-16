import { HttpClientTestingModule } from "@angular/common/http/testing";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { ACTIVE_USER_INFO, StorageServiceMock } from "../../../../test-helpers/mocks";
import { MaterialModule } from "../../../modules/material/material.module";
import { StorageKeys } from "../../constants/storage";
import { IStorage } from "../../models/storage";
import { StorageService } from "../../services/storage/storage.service";
import { SharedModule } from "../../shared.module";
import { NavbarComponent } from "./navbar.component";

const BRAND_NAME_SELECTOR = "[data-apptest='brandName'";
const PROFILE_MENU_SELECTOR = "[data-apptest='profileMenu'";

describe("NavbarComponent", () => {
    let component: NavbarTestComponent;
    let fixture: ComponentFixture<NavbarTestComponent>;
    let storageService: IStorage;

    beforeEach(() => {
        storageService = new StorageServiceMock();

        TestBed.configureTestingModule({
            imports: [MaterialModule, SharedModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [NavbarComponent, NavbarTestComponent],
            providers: [
                { provide: StorageService, useValue: storageService}
            ]
        }).compileComponents();

    });

    it("should create navbar component without profile menu", () => {
        createComponent();

        const navbarDebug = fixture.debugElement.query(By.directive(NavbarComponent));
        expect(navbarDebug).toBeDefined();

        const brandName = navbarDebug.nativeElement.querySelector(BRAND_NAME_SELECTOR) as HTMLElement;
        expect(brandName.innerText).toBe("ContactMe");

        const profileMenu = navbarDebug.nativeElement.querySelector(PROFILE_MENU_SELECTOR);
        expect(profileMenu).toBeNull();
    });

    it("should create navbar component with profile menu when user is logged", () => {
        storageService.setItem(StorageKeys.User, ACTIVE_USER_INFO);

        createComponent();
        const navbarDebug = fixture.debugElement.query(By.directive(NavbarComponent));
        expect(navbarDebug).toBeDefined();

        const profileMenu = navbarDebug.nativeElement.querySelector(PROFILE_MENU_SELECTOR);
        expect(profileMenu).toBeDefined();
    });

    it("should logout successfully", () => {
        storageService.setItem(StorageKeys.User, ACTIVE_USER_INFO);

        createComponent();
        const navbarDebug = fixture.debugElement.query(By.directive(NavbarComponent));
        const navbarComponent = navbarDebug.componentInstance as NavbarComponent;
        let profileMenu = navbarDebug.nativeElement.querySelector(PROFILE_MENU_SELECTOR);
        expect(profileMenu).toBeDefined();

        navbarComponent.logout();
        fixture.detectChanges();

        profileMenu = navbarDebug.nativeElement.querySelector(PROFILE_MENU_SELECTOR);
        expect(profileMenu).toBeNull();
    });

    function createComponent(properties: Partial<NavbarTestComponent> = {}) {
        fixture = TestBed.createComponent(NavbarTestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    }

});

@Component({
    selector: "app-navbar-test",
    template: `
        <app-navbar></app-navbar>
    `,
})
class NavbarTestComponent {}
