import { Component, OnInit } from '@angular/core';
import {CustomerErrorStateMatchers, CustomerForm} from '../../../inits/Customer-init';
import {ItemService} from '../../../services/item.service';
import {MatSnackBar} from '@angular/material';
import {PeopleService} from '../../../services/people.service';
import {errorSnackBar, successSnackBar} from '../../../shared/constants';

@Component({
  selector: 'app-master-buyer',
  templateUrl: './master-buyer.component.html',
  styleUrls: ['./master-buyer.component.scss']
})
export class MasterBuyerComponent implements OnInit {


  page = 0;
  size = 10;


  matchers = CustomerErrorStateMatchers;
  formUtama = CustomerForm();
  constructor(private masterCustomer: PeopleService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  post(a) {
    this.masterCustomer.post(a).subscribe(
      (status) => {
        // successSnackBar('this.snack');
        this.get();
      },
      (e) => errorSnackBar(this.snackBar, 'GAGAL'),
    );
  }

  get() {
    this.masterCustomer.getAll(this.page, this.size).subscribe(
      (v: any[]) => {
        console.log(v)
      },
      (error1) => errorSnackBar(this.snackBar, 'GAGAL'),
      () => {
      }
    );
  }

  delete(id) {
    return this.masterCustomer.delete(id).subscribe(
      (status) => {
        successSnackBar('this.snack');
        this.get();
      },
      (e) => errorSnackBar(this.snackBar, 'GAGAL'),
    );
  }

}
