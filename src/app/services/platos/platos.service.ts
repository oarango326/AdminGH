import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../models/globalConstants';
import {MesaModel} from '../../models/Mesa.model';
import {PlatoModel} from '../../models/Plato.model';

@Injectable({
  providedIn: 'root'
})
export class PlatosService {

  apiUrl = GlobalConstants.apiURL;

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${this.apiUrl}/platos`);
  }

  getAllByLocal(localId: number) {
    return this.http.get(`${this.apiUrl}/platos/local/${localId}`);
  }

  getById(idx: number){
    return this.http.get(`${this.apiUrl}/platos/${idx}`);
  }

  add(plato: PlatoModel) {
    return this.http.post(`${this.apiUrl}/platos`, plato);
  }

  delete(idx: number) {
    return this.http.delete(`${this.apiUrl}/platos/${idx}`);
  }

  update(plato: PlatoModel, idx: number){
    return this.http.put(`${this.apiUrl}/platos/${idx}`, plato);
  }
}
