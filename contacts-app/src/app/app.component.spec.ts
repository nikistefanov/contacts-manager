import { SpyLocation } from '@angular/common/testing';
import { Location } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { authRoutes } from './modules/auth/auth-routing.module';
import { RoutePaths } from './shared/constants/route-paths';
import { Router } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { StorageService } from './shared/services/storage/storage.service';
import { ACTIVE_USER_INFO, StorageServiceMock } from '../test-helpers/mocks';
import { StorageKeys } from './shared/constants/storage';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MaterialModule } from './modules/material/material.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { ContactsModule } from './modules/contacts/contacts.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const NOT_FOUND_HEADING_SELECTOR = "h1";
const CARD_HEADING_SELECTOR = ".app-card__header";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let location: Location;
    let router: Router;
    let storageService: StorageServiceMock;

    it("should initially navigate to login screen", fakeAsync(() => {
        setup();
        expect(location.path()).toBe(RoutePaths.Base);

        router.initialNavigation();
        wait();

        expect(location.path()).toBe(RoutePaths.Login);
        const cardHeader = fixture.debugElement.query(By.css(CARD_HEADING_SELECTOR));

        expect(cardHeader).toBeDefined();
        expect(cardHeader.nativeElement.innerText).toBe("Login");
    }));

    it("should navigate to contacts if user is logged", fakeAsync(() => {
        setup();
        expect(location.path()).toBe(RoutePaths.Base);

        storageService.setItem(StorageKeys.User, ACTIVE_USER_INFO);
        router.initialNavigation();
        wait();

        expect(location.path()).toBe(RoutePaths.Contacts);

        router.navigateByUrl(RoutePaths.Login);
        wait();

        expect(location.path()).toBe(RoutePaths.Contacts);

        router.navigateByUrl(RoutePaths.Register);
        wait();

        expect(location.path()).toBe(RoutePaths.Contacts);
    }));

    it("should NOT navigate to contacts if user is NOT logged", fakeAsync(() => {
        setup();
        expect(location.path()).toBe(RoutePaths.Base);

        router.navigateByUrl(RoutePaths.Contacts);
        wait();

        expect(location.path()).toBe(RoutePaths.Login);
    }));

    it("should navigate to not found page if no matching route is found", fakeAsync(() => {
        setup();
        expect(location.path()).toBe(RoutePaths.Base);

        router.navigateByUrl("somewhere");
        wait();

        const notFoundComponent = fixture.debugElement.query(By.directive(NotFoundComponent));
        expect(notFoundComponent).toBeDefined();

        const heading = (notFoundComponent.nativeElement as HTMLElement).querySelector(NOT_FOUND_HEADING_SELECTOR);
        expect(heading?.innerText).toBe("404");
    }));

    function setup() {
        storageService = new StorageServiceMock();

        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                SharedModule,
                AuthModule,
                ContactsModule,
                MaterialModule,
                RouterTestingModule.withRoutes([...appRoutes, ...authRoutes]),
                HttpClientTestingModule,
                NoopAnimationsModule
            ],
            providers: [
                { provide: StorageService, useValue: storageService },
                { provide: Location, useClass: SpyLocation }
            ]
        });

        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(AppComponent);
        router = TestBed.inject(Router);
    }

    function wait() {
        tick();
        fixture.detectChanges();
    }
});
