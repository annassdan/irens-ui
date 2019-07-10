import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {errorSnackBar, successSnackBar} from '../../../shared/constants';
import {BankService} from '../../../services/bank.service';
import {bankErrorStateMatchers, bankForm} from '../../../inits/bank-init';

@Component({
  selector: 'app-master-bank',
  templateUrl: './master-bank.component.html',
  styleUrls: ['./master-bank.component.scss']
})
export class MasterBankComponent implements OnInit {

  page = 0;
  size = 10;


  matchers = bankErrorStateMatchers;
  formUtama = bankForm();

  constructor(private masterBank: BankService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  post(a) {
    this.masterBank.post(a).subscribe(
      (status) => {
        successSnackBar('this.snack');
        this.get();
      },
      (e) => errorSnackBar(this.snackBar, 'GAGAL'),
    );
  }

  get() {
    this.masterBank.getAll(this.page, this.size).subscribe(
      (v: any[]) => {
        console.log(v)
      },
      (error1) => errorSnackBar(this.snackBar, 'GAGAL'),
      () => {
      }
    );
  }

  delete(id) {
    return this.masterBank.delete(id).subscribe(
      (status) => {
        successSnackBar('this.snack');
        this.get();
      },
      (e) => errorSnackBar(this.snackBar, 'GAGAL'),
    );
  }


}
