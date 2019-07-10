import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiHost} from '../shared/constants';
import {apis} from '../shared/links';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) {}

  post = (body) => this.http.post(`${apiHost}${apis.people.post}`, body);

  delete = (id) => this.http.delete(`${apiHost}${apis.people.delete}/${id}`);

  getById = (id) => this.http.get(`${apiHost}${apis.people.getById}/${id}`);

  getAll = (page, size) => this.http.delete(`${apiHost}${apis.people.getAll}/?page=${page}&size=${size}`);
  
}
