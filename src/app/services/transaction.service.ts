import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost} from '../shared/constants';
import {apis} from '../shared/links';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private http: HttpClient) {}

  post = (body) => this.http.post(`${apiHost}${apis.transaction.post}`, body);

  getById = (id) => this.http.get(`${apiHost}${apis.transaction.getById}/${id}`);

  getAll = (page, size) => this.http.get(`${apiHost}${apis.transaction.getAll}/?page=${page}&size=${size}`);
  
}
