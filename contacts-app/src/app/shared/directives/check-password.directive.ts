import { Directive } from '@angular/core';
import { AbstractControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

function validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
        let isValid = false;
        if (control && control instanceof FormGroup) {
            let group = control as FormGroup;
            const keys = Object.keys(group.controls);

            // There must be only 2 fields
            if (keys.length === 2) {
                isValid = group.controls[keys[0]].value == group.controls[keys[1]].value;
            }
        }
        if (isValid) {
            return null;
        } else {
            return { 'passwordCheck': 'failed' }
        }
    }
}

@Directive({
    selector: '[appCheckPassword]',
    providers: [{ provide: NG_VALIDATORS, useExisting: CheckPasswordDirective, multi: true }]
})
export class CheckPasswordDirective implements Validator {
    private valFn;

    constructor() {
        this.valFn = validatePassword();
    }

    validate(c: AbstractControl): ValidationErrors | null {
        return this.valFn(c);
    }

}
