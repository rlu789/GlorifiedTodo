import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';

export class Constants {
    public static boardColors: { text: string, value: number | string }[] = [{
        text: 'None',
        value: undefined
    }, {
        text: 'Red',
        value: 'Red'
    }, {
        text: 'Green',
        value: 'Green'
    }, {
        text: 'Orange',
        value: 'Orange'
    }, {
        text: 'Yellow',
        value: 'Yellow'
    },{
        text: 'Blue',
        value: 'Blue'
    }, {
        text: 'Purple',
        value: 'Purple'
    }, {
        text: 'Dark',
        value: 'Dark'
    }];
}

export class CustomValidators {
    public static whiteSpaceValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: string } | null => {
            if (control.value.length && (!control.value.trim() || control.value[0] === ' ' || control.value[control.value.length - 1] === ' ')) {
                return { 'white-sace': 'Field has whitespace errors' };
            }
        }
    };
    public static matchValidator(strToMatch: FormControl): ValidatorFn {
        return (control: AbstractControl): { [key: string]: string } | null => {
            if (strToMatch.value && control.value !== strToMatch.value) {
                return { 'match': 'Fields don\'t match' };
            }
        }
    };
}

export class CustomFormControl extends FormControl {
    public hasFocus: boolean = false;

    constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(formState, validatorOrOpts, asyncValidator);
    }

    public controlSubmittable(): boolean {
        this.updateValueAndValidity();
        if (this.invalid) {
            this.markAsDirty();
            this.markAsTouched();
            this.hasFocus = true;
        }
        return this.valid;
    }
}

export class CustomFormGroup extends FormGroup {
    private ctrls: CustomFormControl[] = [];

    constructor(controls: {
        [key: string]: CustomFormControl;
    }, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
        super(controls, validatorOrOpts, asyncValidator);
        Object.keys(controls).forEach((c) => {
            this.ctrls.push(controls[c]);
        });
    }
    /**
        * Calls `updateValueAndValidity` and checks if any `FormControl` is invalid.
        * If invalid, focus is applied to the first invalid field.
        * Returns true if form is valid
        */
    public formSubmittable(): boolean {
        for (let i in this.ctrls) {
            if (!this.ctrls[i].controlSubmittable()) {
                break;
            }
        }
        return this.valid;
    }
}