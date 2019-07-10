import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {errorSnackBar, successSnackBar} from '../../../shared/constants';
import {BankService} from '../../../services/bank.service';
import {bankErrorStateMatchers, bankForm} from '../../../inits/bank-init';
import {Extra} from '../../../shared/extra';
import {AppTableDataSource} from '../../../shared/app-table-data-source';

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


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  gettingData = false;
  ex = new Extra();
  selectedValue;
  dataSource: AppTableDataSource;
  receivedData: any;
  tableConf = () => { return { id: 'bankId', page: this.page, size: this.size }};
  totalElements = () => this.receivedData ? this.receivedData.totalElements : 0;
  tableProperties = {
    displayedColumns: ['bankId', 'bankName'],
    displayedHeaders: ['No', 'Nama Bank'],
    levelsOnData: [['bankId'], ['bankName']]
  };




  constructor(private masterBank: BankService,
              public snackBar: MatSnackBar) { }

  onDataSizeChanged(pagination) {
    if (pagination.pageIndex !== this.page) {
      this.page = pagination.pageIndex;
      this.size = pagination.pageSize;
    } else {
      this.page = 0;
      this.size = pagination.pageSize;
    }
    this.get();
  }



  ngOnInit() {
    this.get();
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
        this.receivedData = v;
        this.dataSource = new AppTableDataSource((<any[]>v['content']), null, this.paginator, this.sort);
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
