import { Injectable } from '@angular/core';
import {InsumoModel} from '../../models/Insumo.model';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../models/globalConstants';

@Injectable({
  providedIn: 'root'
})
export class InsumosService {

  url = GlobalConstants.apiURL;
  insumos: InsumoModel[] = [] ;
  insumo: InsumoModel;
  constructor(private http: HttpClient) {

  }
  getAll(){
    return this.http.get(`${this.url}/Insumos`);
  }
  getById(idx: number){
    return this.http.get(`${this.url}/Insumos/${idx}`);
  }
  add(insumo: InsumoModel) {
    return this.http.post(`${this.url}/Insumos`, insumo);
  }
  update(insumo: InsumoModel, idx: number){
    return this.http.put(`${this.url}/Insumos/${idx}`, insumo);
  }
  delete(idx: number){
    return this.http.delete(`${this.url}/Insumos/${idx}`);
  }
}
