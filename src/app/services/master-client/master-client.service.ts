import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {apiHost} from '../../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class MasterClientService {

  constructor(private http: HttpClient) { }

  add(id): Observable<any>{
    return this.http.post(apiHost + '/api_pelaporan/data_client/', id);
  }

  get() {
    return this.http.get(apiHost + '/api_pelaporan/data_client/');
  }

  edit(id, nama) {
    return this.http.put(apiHost + '/api_pelaporan/data_client/' + id + '/', nama);
  }

  delete(id) {
    return this.http.delete(apiHost + '/api_pelaporan/data_client/' + id + '/');
  }


}
