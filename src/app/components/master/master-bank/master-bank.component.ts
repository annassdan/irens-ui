import { Component, OnInit } from '@angular/core';
import {MasterBankService} from '../../../services/master-bank/master-bank.service';
import {MatSnackBar} from '@angular/material';
import {errorSnackBar, successSnackBar} from '../../../shared/constants';

@Component({
  selector: 'app-master-bank',
  templateUrl: './master-bank.component.html',
  styleUrls: ['./master-bank.component.scss']
})
export class MasterBankComponent implements OnInit {

  data: any;
  no_rek: any;
  id_client: any;
  nama_bank: any;

  constructor(private masterBank: MasterBankService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  add(a) {
    this.masterBank.add(a).subscribe(
      (status) => {
        successSnackBar('this.snack');
        this.get();
      },
      (e) => errorSnackBar(this.snackBar, 'GAGAL'),
    );
  }

  get() {
    this.masterBank.get().subscribe(
      (v: any[]) => {
        this.data = v;

      },
      (error1) => errorSnackBar(this.snackBar, 'GAGAL'),
      () => {
      }
    );
  }

  edit(id, a) {
    this.masterBank.edit(id, a).subscribe(
      (status) => {
        successSnackBar('this.snack');
        this.get();
      },
      (e) =>errorSnackBar(this.snackBar, 'GAGAL'),
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

  saveButton(){
    const a = {
      no_rek: this.no_rek,
      id_client: this.id_client,
      nama_bank: this.nama_bank
    };
    if (a.no_rek === undefined || a.nama_bank === undefined || a.id_client === undefined) {
      this.snackBar.open("Ada Field Kosong !", '', {
        duration: 1000,
        panelClass: ['warning-snackbar']
      });
      return;
    }
    this.add(a);
   this.clearAll();
  }

  clearAll() {
    this.no_rek = undefined;
    this.id_client = undefined;
    this.nama_bank = undefined;
  }
}
