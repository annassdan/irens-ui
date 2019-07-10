import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost} from '../shared/constants';
import {apis} from '../shared/links';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) {}

  post = (body) => this.http.post(`${apiHost}${apis.item.post}`, body);

  delete = (id) => this.http.delete(`${apiHost}${apis.item.delete}/${id}`);

  getById = (id) => this.http.get(`${apiHost}${apis.item.getById}/${id}`);

  getAll = (page, size) => this.http.delete(`${apiHost}${apis.item.getAll}/?page=${page}&size=${size}`);
  
  
}
