import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost} from '../shared/constants';
import {apis} from '../shared/links';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(private http: HttpClient) {}

  post = (body) => this.http.post(`${apiHost}${apis.bank.post}`, body);

  delete = (id) => this.http.delete(`${apiHost}${apis.bank.delete}/${id}`);

  getById = (id) => this.http.get(`${apiHost}${apis.bank.getById}/${id}`);

  getAll = (page, size) => this.http.get(`${apiHost}${apis.bank.getAll}/?page=${page}&size=${size}`);


}
