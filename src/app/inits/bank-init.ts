import {FormBuilder, Validators} from '@angular/forms';
import {AppErrorStateMatcher, generateFormControlConfig} from '../shared/utils';


/* Model */
export interface Bank {
  bankId?: string;
  bankName?: string;
}
/* End of Models */


/* Inits Value */
export const bankInit = {
  bankId: '',
  bankName: ''
};
/* End of Inits Value */


/* Disables Form Status */
export const bankDisables = {
  bankId: false,
  bankName: false
};
/* End of Disable Form input status*/


/* Form Input Validators */
export const bankValidators = {
  bankId: null,
  bankName: Validators.required
};
/* end of form input validators */


/* stateMatchers */
export const bankErrorStateMatchers = {
  bankId: null,
  bankName: { matcher: new AppErrorStateMatcher(), message: 'Tidak Boleh Kosong' },
};
/* end of stateMatchers */


/* Form models */
export function bankForm(
  init = bankInit,
  disables = bankDisables,
  forGeneralization = false,
  validators = bankValidators
) {
  return new FormBuilder().group({
    bankId: generateFormControlConfig('jenisBerat', init, disables, validators, forGeneralization),
    bankName: generateFormControlConfig('jenisBerat', init, disables, validators, forGeneralization)
  });
}
/* End of Form Models */














