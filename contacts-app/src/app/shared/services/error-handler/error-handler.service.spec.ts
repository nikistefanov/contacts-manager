import { TestBed } from "@angular/core/testing";
import { MaterialModule } from "../../../modules/material/material.module";

import { DEFAULT_ERROR_MESSAGE, ErrorHandlerService } from "./error-handler.service";

describe("ErrorHandlerService", () => {
    let service: ErrorHandlerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MaterialModule]
        });
        service = TestBed.inject(ErrorHandlerService);
    });

    it("should show default message if no match is found", () => {
        const serviceAsAny = service as any;
        const data = null;

        const messageSpy = spyOn(serviceAsAny, "openSnackBar");
        serviceAsAny.handleError(data);

        expect(messageSpy).toHaveBeenCalledWith(DEFAULT_ERROR_MESSAGE);
    });

    it("should show corrent message when server error match is found", () => {
        const expectedMessage = "Identifier or password invalid.";
        const mockedError = { error: { data: [{ messages: [{ message: expectedMessage }] }]}};

        const serviceAsAny = service as any;

        const messageSpy = spyOn(serviceAsAny, "openSnackBar");
        serviceAsAny.handleError(mockedError);

        expect(messageSpy).toHaveBeenCalledWith(expectedMessage);
    });
});
