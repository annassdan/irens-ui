import {FormBuilder, Validators} from '@angular/forms';
import {AppErrorStateMatcher, generateFormControlConfig} from '../shared/utils';


/* Model */
export interface Customer {
  customerId?: string;
  customerName?: string;
  customerAddress?: string;
  customerPhone?: string;
  salary?: any;
}

/* End of Models */


/* Inits Value */
export const CustomerInit = {
  customerId: '',
  customerName: '',
  customerAddress: '',
  customerPhone: '',
  salary: '',
};
/* End of Inits Value */


/* Disables Form Status */
export const CustomerDisables = {
  customerId: false,
  customerName: false,
  customerAddress: false,
  customerPhone: false,
  salary: false,
};
/* End of Disable Form input status*/


/* Form Input Validators */
export const CustomerValidators = {
  customerId: null,
  customerName: Validators.required,
  customerAddress: Validators.required,
  customerPhone: Validators.required,
  salary: null,
};
/* end of form input validators */


/* stateMatchers */
export const CustomerErrorStateMatchers = {
  customerId: null,
  customerName: {matcher: new AppErrorStateMatcher(), message: 'Tidak Boleh Kosong'},
  customerAddress: {matcher: new AppErrorStateMatcher(), message: 'Tidak Boleh Kosong'},
  customerPhone: {matcher: new AppErrorStateMatcher(), message: 'Tidak Boleh Kosong'},
  salary: {matcher: new AppErrorStateMatcher(), message: 'Tidak Boleh Kosong'},
};
/* end of stateMatchers */


/* Form models */
export function CustomerForm(
  init = CustomerInit,
  disables = CustomerDisables,
  forGeneralization = false,
  validators = CustomerValidators
) {
  return new FormBuilder().group({
    customerId: generateFormControlConfig('customerId', init, disables, validators, forGeneralization),
    customerName: generateFormControlConfig('customerName', init, disables, validators, forGeneralization),
    customerAddress: generateFormControlConfig('customerAddress', init, disables, validators, forGeneralization),
    customerPhone: generateFormControlConfig('customerPhone', init, disables, validators, forGeneralization),
    salary: generateFormControlConfig('salary', init, disables, validators, forGeneralization)
  });
}



/* End of Form Models */














