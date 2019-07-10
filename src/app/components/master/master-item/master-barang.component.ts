import {Component, OnInit} from '@angular/core';
import {itemErrorStateMatchers, itemForm} from '../../../inits/item-init';
import {errorSnackBar, successSnackBar} from '../../../shared/constants';
import {MatSnackBar} from '@angular/material';
import {ItemService} from '../../../services/item.service';

@Component({
  selector: 'app-master-barang',
  templateUrl: './master-barang.component.html',
  styleUrls: ['./master-barang.component.scss']
})
export class MasterBarangComponent implements OnInit {

  page = 0;
  size = 10;


  matchers = itemErrorStateMatchers;
  formUtama = itemForm();


  constructor(private masterItem: ItemService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  post(a) {
    this.masterItem.post(a).subscribe(
      (status) => {
        // successSnackBar('this.snack');
        this.get();
      },
      (e) => errorSnackBar(this.snackBar, 'GAGAL'),
    );
  }

  get() {
    this.masterItem.getAll(this.page, this.size).subscribe(
      (v: any[]) => {
        console.log(v);
      },
      (error1) => errorSnackBar(this.snackBar, 'GAGAL'),
      () => {
      }
    );
  }

  delete(id) {
    return this.masterItem.delete(id).subscribe(
      (status) => {
        successSnackBar('this.snack');
        this.get();
      },
      (e) => errorSnackBar(this.snackBar, 'GAGAL'),
    );
  }

}
