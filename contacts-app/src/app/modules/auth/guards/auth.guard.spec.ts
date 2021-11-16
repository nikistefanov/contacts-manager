import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { ACTIVE_USER_INFO, INACTIVE_USER_INFO, StorageServiceMock } from "../../../../test-helpers/mocks";
import { StorageKeys } from "../../../shared/constants/storage";
import { IUserInfo } from "../../../shared/models/user";
import { StorageService } from "../../../shared/services/storage/storage.service";
import { AuthService } from "../auth.service";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard (isolated)", () => {
    let guard: AuthGuard;
    let authService: AuthService
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
    });

    it("should be able to activate route when user is logged", () => {
        guard = setup(ACTIVE_USER_INFO);

        expect(guard.canActivate()).toBeTruthy();
    });

    it("should NOT be able to activate route when user is logged but with inactive token", () => {
        guard = setup(INACTIVE_USER_INFO);

        expect(guard.canActivate()).toBeFalse();
    });

    it("should NOT be able to activate route when user is logged", () => {
        guard = setup();

        expect(guard.canActivate()).toBeFalse();
    });

    function setup(userInfo?: IUserInfo | undefined) {
        if (userInfo) {
            storageService.setItem(StorageKeys.User, userInfo);
        }

        const mockRouter = {
            navigateByUrl: () => {}
        };

        return new AuthGuard(authService, mockRouter as any);
    }
});

