import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn} from '@angular/forms';

export class CustomValidators {
    public static matchValidator(strToMatch: FormControl): ValidatorFn {
        return (control: AbstractControl): { [key: string]: string } | null => {
            if (strToMatch.value && control.value !== strToMatch.value) {
                return { 'match': 'Passwords don\'t match' };
            }
        }
    };
}

export class CustomFormControl extends FormControl{
    public hasFocus: boolean = false;

    constructor(formState?: any, validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null, asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null){
        super(formState, validatorOrOpts, asyncValidator);
    }

}