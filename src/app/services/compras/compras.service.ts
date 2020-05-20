import { Injectable } from '@angular/core';
import {GlobalConstants} from '../../models/globalConstants';
import {ProveedorModel} from '../../models/Proveedor.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  url = GlobalConstants.apiURL;
  proveedor: ProveedorModel;
  proveedores: ProveedorModel[] = [];
  constructor(private http: HttpClient) {
  }
  getAll() {
    return this.http.get(`${this.url}/compras`);
  }
  getById(idx: number){
    return this.http.get(`${this.url}/compras/` + idx);
  }

  add(compra: any){
    return this.http.post(`${this.url}/compras`, compra);
  }

  update(compra: any, idx: number ){
    return this.http.put(`${this.url}/compras/` + idx, compra);
  }
  delete(idx: number){
    return this.http.delete(`${this.url}/compras/${idx}`);
  }
}
