import {FormBuilder, Validators} from '@angular/forms';
import {AppErrorStateMatcher, generateFormControlConfig} from '../shared/utils';


/* Model */
export interface Item {
  itemId?: string;
  itemName?: string;
}
/* End of Models */


/* Inits Value */
export const itemInit = {
  itemId: '',
  itemName: ''
};
/* End of Inits Value */


/* Disables Form Status */
export const itemDisables = {
  itemId: false,
  itemName: false
};
/* End of Disable Form input status*/


/* Form Input Validators */
export const itemValidators = {
  itemId: null,
  itemName: Validators.required
};
/* end of form input validators */


/* stateMatchers */
export const itemErrorStateMatchers = {
  itemId: null,
  itemName: { matcher: new AppErrorStateMatcher(), message: 'Tidak Boleh Kosong' },
};
/* end of stateMatchers */


/* Form models */
export function itemForm(
  init = itemInit,
  disables = itemDisables,
  forGeneralization = false,
  validators = itemValidators
) {
  return new FormBuilder().group({
    itemId: generateFormControlConfig('itemId', init, disables, validators, forGeneralization),
    itemName: generateFormControlConfig('itemName', init, disables, validators, forGeneralization)
  });
}
/* End of Form Models */














