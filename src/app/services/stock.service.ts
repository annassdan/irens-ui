import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost} from '../shared/constants';
import {apis} from '../shared/links';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) {}

  post = (body) => this.http.post(`${apiHost}${apis.stock.post}`, body);

  delete = (id) => this.http.delete(`${apiHost}${apis.stock.delete}/${id}`);

  getById = (id) => this.http.get(`${apiHost}${apis.stock.getById}/${id}`);

  getAll = (page, size) => this.http.delete(`${apiHost}${apis.stock.getAll}/?page=${page}&size=${size}`);
  
  
}
