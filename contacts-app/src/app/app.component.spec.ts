import { SpyLocation } from '@angular/common/testing';
import { Location } from "@angular/common";
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { authRoutes } from './modules/auth/auth-routing.module';
import { RoutePaths } from './shared/constants/route-paths';
import { Router } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { StorageService } from './shared/services/storage/storage.service';
import { StorageServiceMock } from '../test-helpers/mocks';

const NOT_FOUND_HEADING_SELECTOR = "h1";

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let location: Location;
    let router: Router;

    it("should initially navigate to login screen", fakeAsync(() => {
        setup();
        expect(location.path()).toBe(RoutePaths.Base);

        router.initialNavigation();
        wait();

        expect(location.path()).toBe(RoutePaths.Login);
        const cardHeader = fixture.debugElement.query(By.css(".app-card__header"));

        expect(cardHeader).toBeDefined();
        expect(cardHeader.nativeElement.innerText).toBe("Login");
    }));

    it("should navigate to not found page if no matching route is found", fakeAsync(() => {
        setup();
        expect(location.path()).toBe(RoutePaths.Base);

        router.navigateByUrl("no-result");
        wait();

        const notFoundComponent = fixture.debugElement.query(By.directive(NotFoundComponent));
        expect(notFoundComponent).toBeDefined();

        const heading = (notFoundComponent.nativeElement as HTMLElement).querySelector(NOT_FOUND_HEADING_SELECTOR);
        expect(heading?.innerText).toBe("404");
    }));

    function setup() {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                AppModule,
                RouterTestingModule.withRoutes([...appRoutes, ...authRoutes])],
            providers: [
                { provide: StorageService, useClass: StorageServiceMock },
                { provide: Location, useClass: SpyLocation }
            ]
        });

        location = TestBed.inject(Location);
        fixture = TestBed.createComponent(AppComponent);
        router = TestBed.inject(Router);

        wait();
    }

    function wait() {
        tick();
        fixture.detectChanges();
    }
});
