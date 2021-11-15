import { SpyLocation } from '@angular/common/testing';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthServiceMock, LocalStorageServiceMock } from '../test-helpers/mocks';
import { appRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { authRoutes } from './modules/auth/auth-routing.module';
import { AuthService } from './modules/auth/auth.service';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { AuthGuard } from './modules/auth/guards/auth.guard';
import { ContactsComponent } from './modules/contacts/components/contacts/contacts.component';
import { contactsRoutes } from './modules/contacts/contacts-routing.module';
import { IUser } from './shared/models/user';
import { LocalStorageService } from './shared/services/local-storage/local-storage.service';

xdescribe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let storageService: LocalStorageServiceMock;
    let authService: AuthServiceMock;
    let router: Router;
    let location: Location;

    it('should complete the happy path', fakeAsync(() => {
        setup();

        const user: IUser = {
            id: 1,
            username: "joe",
            email: "joe@doe.com",
            password: "password"
        };
        const loginElement = fixture.debugElement.query(By.directive(LoginComponent));
        expect(loginElement).toBeDefined();

        loginElement.componentInstance.login(user);
        tick();

        debugger;
    }));

    function setup() {
        storageService = new LocalStorageServiceMock();
        authService = new AuthServiceMock(true, true);

        TestBed.configureTestingModule({
            declarations: [
                AppComponent,
                LoginComponent,
                ContactsComponent
            ],
            imports: [
                AppModule,
                RouterTestingModule.withRoutes([...appRoutes, ...authRoutes, ...contactsRoutes]),
                NoopAnimationsModule],
            providers: [
                { provide: Location, useClass: SpyLocation },
                { provide: AuthService, useValue: authService },
                { provide: LocalStorageService, useValue: storageService }
            ]
        });

        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        router.initialNavigation();
        tick();
    }
});
