import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MasterBarangComponent} from './components/master/master-item/master-barang.component';
import {MasterBuyerComponent} from './components/master/master-people/master-buyer.component';
import {MasterPekerjaComponent} from './components/master/master-warehouse/master-pekerja.component';
import {MasterBankComponent} from './components/master/master-bank/master-bank.component';
import {MainNavComponent} from './components/main-nav/main-nav.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PenjualanComponent} from './components/penjualan/penjualan.component';
import {PembelianComponent} from './components/pembelian/pembelian.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AsIdrFormatPipe} from './shared/pipes/as-idr-format.pipe';
import {MyAutoCompleteComponent} from './shared/components/my-auto-complete/my-auto-complete.component';
import {BhkMatAutocompleteTriggerDirective} from './shared/directives/app-mat-autocomplete';
import {MatAutocompleteOriginBhkDirective} from './shared/directives/app-mat-autocomplete-origin';
import {AutocompleteTriggerDirective} from './shared/directives/autocomplete-trigger.directive';

@NgModule({
  declarations: [
    AppComponent,
    MasterBarangComponent,
    MasterBuyerComponent,
    MasterPekerjaComponent,
    MasterBankComponent,
    MainNavComponent,
    PenjualanComponent,
    PembelianComponent,
    AsIdrFormatPipe,
    MyAutoCompleteComponent,
    BhkMatAutocompleteTriggerDirective,
    MatAutocompleteOriginBhkDirective,
    AutocompleteTriggerDirective


  ],
  imports: [
    BrowserModule, HttpClientModule,

    ReactiveFormsModule,
    MatAutocompleteModule,


    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
    MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatIconModule,
    MatInputModule, MatListModule, MatMenuModule,
    MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule, FormsModule, ReactiveFormsModule
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
export class AppModule {
}
