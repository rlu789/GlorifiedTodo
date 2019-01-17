import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

var matchValidator = function(strToMatch: FormControl): ValidatorFn { // TODO move to common location
    return (control: AbstractControl): { [key: string]: string } | null => {
        if (strToMatch.value && control.value !== strToMatch.value) {
            return { 'match': 'Passwords don\'t match' };
        }
    }
};

export { matchValidator }