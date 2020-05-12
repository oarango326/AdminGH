
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../models/globalConstants';
import {ProveedorModel} from '../../models/Proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  url = GlobalConstants.apiURL;
  proveedor: ProveedorModel;
  proveedores: ProveedorModel[] = [];
  constructor(private http: HttpClient) {
  }
  getAll() {
    return this.http.get(`${this.url}/Proveedores`);
  }
  getById(idx: number){
    return this.http.get(`${this.url}/Proveedores/` + idx);
  }

  add(proveedor: ProveedorModel){
    return this.http.post(`${this.url}/Proveedores`, proveedor);
  }

  update(proveedor: ProveedorModel, idx: number ){
    console.log('desde el servicio');
    console.log(proveedor);
    return this.http.put(`${this.url}/Proveedores/` + idx, proveedor);
  }
  delete(idx: number){
    return this.http.delete(`${this.url}/Proveedores/${idx}`);
  }
}


