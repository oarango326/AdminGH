import { Injectable } from '@angular/core';
import {GlobalConstants} from '../../models/globalConstants';
import {HttpClient} from '@angular/common/http';
import {AlmacenModel} from '../../models/Almacen.model';

@Injectable({
  providedIn: 'root'
})
export class AlmacenesService {

  url = GlobalConstants.apiURL;
  almacen: AlmacenModel;
  almacenes: AlmacenModel[] = [];
  constructor(private http: HttpClient) {
  }
  getAll() {
    return this.http.get(`${this.url}/almacenes`);
  }
  getById(idx: number){
    return this.http.get(`${this.url}/almacenes/` + idx);
  }

  getByLocalId(idx: number){
    return this.http.get(`${this.url}/almacenes/local/` + idx);
  }
  add(almacen: AlmacenModel){
    return this.http.post(`${this.url}/almacenes`, almacen);
  }

  update(almacen: AlmacenModel, idx: number ){
    return this.http.put(`${this.url}/almacenes/` + idx, almacen);
  }
  delete(idx: number){
    return this.http.delete(`${this.url}/almacenes/${idx}`);
  }

  getAlmacenDetalleByAlmacenId(idx: number){
    return this.http.get(`${this.url}/almacenDetalle/almacen/`+ idx);
  }

}
