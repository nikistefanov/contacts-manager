import { HttpClientTestingModule, HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { fakeAsync, TestBed } from "@angular/core/testing";
import { ACTIVE_USER_INFO, INACTIVE_USER_INFO, StorageServiceMock, USER } from "../../../test-helpers/mocks";
import { StorageKeys } from "../../shared/constants/storage";
import { StorageService } from "../../shared/services/storage/storage.service";
import { AuthService, AUTH_LOGIN } from "./auth.service";

describe("AuthService", () => {
    let authService: AuthService
    let httpTestingController: HttpTestingController;
    let storageService: StorageServiceMock;

    beforeEach(() => {
        storageService = new StorageServiceMock();

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: StorageService, useValue: storageService }
            ]
        });
        authService = TestBed.inject(AuthService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    it("should return that user is logged when active token", () => {
        storageService.setItem(StorageKeys.User, ACTIVE_USER_INFO);

        expect(authService.isLogged).toBeTrue();
    });

    it("should return that user is expired when inactive token", () => {
        storageService.setItem(StorageKeys.User, INACTIVE_USER_INFO);

        expect(authService.isLogged).toBeFalse();
    });

    it("should return false when no token found", () => {
        expect(authService.isLogged).toBeFalsy();
    });

    it("should return correct user info when successfull login", fakeAsync(() => {
        authService.login(USER).subscribe(data => {
            expect(data).toBe(ACTIVE_USER_INFO);
        });
        const req: TestRequest = httpTestingController.expectOne(AUTH_LOGIN);
        expect(req.request.method).toBe("POST");

        req.flush(ACTIVE_USER_INFO);
    }));

    it("should clear storage data when logout", fakeAsync(() => {
        storageService.setItem(StorageKeys.User, ACTIVE_USER_INFO);

        expect(storageService.getItem(StorageKeys.User)).toBe(ACTIVE_USER_INFO);

        authService.logout();

        expect(storageService.getItem(StorageKeys.User)).not.toBeDefined();
    }));
});
