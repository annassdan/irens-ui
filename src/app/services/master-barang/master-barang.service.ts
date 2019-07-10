import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiHost} from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MasterBarangService {

  constructor(private http: HttpClient) { }

  add(id): Observable<any>{
    return this.http.post(apiHost + '/api_pelaporan/data_barang/', id);
  }

  get() {
    return this.http.get(apiHost + '/api_pelaporan/data_barang/');
  }

  edit(id, nama) {
    return this.http.put(apiHost + '/api_pelaporan/data_barang/' + id + '/', nama);
  }

  delete(id) {
    return this.http.delete(apiHost + '/api_pelaporan/data_barang/' + id + '/');
  }


}
