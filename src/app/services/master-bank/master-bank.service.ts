import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost} from '../../shared/constants';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterBankService {

  constructor(private http: HttpClient) { }

  add(body): Observable<any>{
    let bodyTemp = new URLSearchParams();
    bodyTemp.set('inputNoRekening',body.no_rek);
    bodyTemp.set('inputIdClient',body.id_client);
    bodyTemp.set('inputNamaBank',body.nama_bank);
    return this.http.post(apiHost + `/api_pelaporan/master/data_bank.php/?inputNoRekening=${body.no_rek}&inputIdClient=${body.id_client}&inputNamaBank=${body.nama_bank}`, null);

  }

  get() {
    return this.http.get(apiHost + '/api_pelaporan/master/data_bank.php/');
  }

  edit(id, nama) {
    return this.http.put(apiHost + '/api_pelaporan/master/data_bank.php/' + id + '/', nama);
  }

  delete(id) {
    return this.http.delete(apiHost + '/api_pelaporan/master/data_bank.php/' + id + '/');
  }


}
