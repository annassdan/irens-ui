import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost} from '../shared/constants';
import {apis} from '../shared/links';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) {}

  post = (body) => this.http.post(`${apiHost}${apis.warehouse.post}`, body);

  delete = (id) => this.http.delete(`${apiHost}${apis.warehouse.delete}/${id}`);

  getById = (id) => this.http.get(`${apiHost}${apis.warehouse.getById}/${id}`);

  getAll = (page, size) => this.http.delete(`${apiHost}${apis.warehouse.getAll}/?page=${page}&size=${size}`);
  
  
}
