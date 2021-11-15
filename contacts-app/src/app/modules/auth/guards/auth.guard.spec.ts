import { AuthService } from "../auth.service";
import { AuthGuard } from "./auth.guard";

describe("AuthGuard (isolated)", () => {
    let guard: AuthGuard;

    it("should be able to activate route when user is logged", () => {
        guard = createAuthGuard(true);

        expect(guard.canActivate()).toBeTruthy();
    });

    it("should NOT be able to activate route when user is logged", () => {
        guard = createAuthGuard(false);

        expect(guard.canActivate()).toBeFalse();
    });

    function createAuthGuard(canActivate: boolean) {
        const mockAuthService: Pick<AuthService, "isLogged"> = {
            isLogged: canActivate
        };

        const mockRouter = {
            navigateByUrl: () => {}
        };

        return new AuthGuard(mockAuthService as any, mockRouter as any);
    }
});

