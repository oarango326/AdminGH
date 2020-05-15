import { Injectable } from '@angular/core';
import {GlobalConstants} from '../../models/globalConstants';
import {LocalModel} from '../../models/Local.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {
  url = GlobalConstants.apiURL;
  local: LocalModel = new LocalModel();
  locales: LocalModel[] = [];
  token: string;
  httpOptions: { headers: HttpHeaders };



  constructor(private http: HttpClient) {
    this.token = this.leerToken();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
        Authorization: this.token})
    };
   // console.log(this.httpOptions);
  }
  getLocales() {
    return this.http.get(`${this.url}/locales`, this.httpOptions);
  }
  getLocal(idx: number){
    return this.http.get(`${this.url}/locales/` + idx, this.httpOptions);
  }

  addLocal(local: LocalModel){
    return this.http.post(`${this.url}/locales`, local, this.httpOptions);
  }

  updateLocal(local: LocalModel, idx: number ){
    return this.http.put(`${this.url}/locales/` + idx, local, this.httpOptions);
  }
  deleteLocal(idx: number){
    return this.http.delete(`${this.url}/locales/${idx}`, this.httpOptions);
  }
  leerToken(){
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
    return this.token;
  }
}
