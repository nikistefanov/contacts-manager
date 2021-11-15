import { TestBed } from "@angular/core/testing";
import { ACTIVE_USER_INFO, INACTIVE_USER_INFO } from "../../../test-helpers/mocks";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let authService: AuthService

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [AuthModule]
        });
        authService = TestBed.inject(AuthService);
    });

    it("should return that user is logged when active token", () => {
        spyOn(authService, "getUserInfo").and.returnValue(ACTIVE_USER_INFO);
        expect(authService.isLogged).toBeTrue();
    });

    it("should return that user is expired when inactive token", () => {
        spyOn(authService, "getUserInfo").and.returnValue(INACTIVE_USER_INFO);

        expect(authService.isLogged).toBeFalse();
    });

    it("should return false when no token found", () => {
        spyOn(authService as any, "getUserInfo").and.returnValue(null);

        expect(authService.isLogged).toBeFalsy();
    });
});
