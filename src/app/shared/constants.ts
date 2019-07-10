import {Observable} from "rxjs";

// export const apiHost = 'http://bwssulawesi4.com';
export const apiHost = 'http://localhost';

export function successSnackBar(snack) {
  snack.open("Sukses !", '', {
    duration: 500,
    panelClass: ['success-snackbar']
  });
}

export function errorSnackBar(snack, e) {
  snack.open(e, '', {
    duration: 1500,
    panelClass: ['error-snackbar']
  });
}

export function warningSnackBar(snack, e) {
  snack.open(e, '', {
    duration: 2000,
    panelClass: ['warning-snackbar']
  });
}
