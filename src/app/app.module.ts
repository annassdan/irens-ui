import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
  MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MasterBarangComponent } from './components/master/master-barang/master-barang.component';
import { MasterSupplierComponent } from './components/master/master-supplier/master-supplier.component';
import { MasterBuyerComponent } from './components/master/master-client/master-buyer.component';
import { MasterPekerjaComponent } from './components/master/master-pekerja/master-pekerja.component';
import { MasterBankComponent } from './components/master/master-bank/master-bank.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PenjualanComponent } from './components/penjualan/penjualan.component';
import { PembelianComponent } from './components/pembelian/pembelian.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MasterBarangComponent,
    MasterSupplierComponent,
    MasterBuyerComponent,
    MasterPekerjaComponent,
    MasterBankComponent,
    MainNavComponent,
    PenjualanComponent,
    PembelianComponent,

  ],
  imports: [
    BrowserModule, HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
    MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule,
    MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule, FormsModule
  ],
  exports: [
    BrowserAnimationsModule, HttpClientModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
    MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule,
    MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
