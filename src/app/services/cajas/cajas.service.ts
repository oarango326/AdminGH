import { Injectable } from '@angular/core';
import {GlobalConstants} from '../../models/globalConstants';
import {HttpClient} from '@angular/common/http';
import {CajaModel} from '../../models/Caja.model';


@Injectable({
  providedIn: 'root'
})
export class CajasService {

  apiUrl = GlobalConstants.apiURL;
  private cajaTemp: CajaModel;
  constructor(private http: HttpClient) {

  }
  getCajas(local: number){
    return this.http.get(`${this.apiUrl}/cajas/local/${local}`);
  }
  getCaja(idx: number){
    return this.http.get(`${this.apiUrl}/cajas/${idx}`);
  }

  addCaja(caja: any, local: number){
    this.cajaTemp = new CajaModel();
    this.cajaTemp.numeroCaja = parseInt(caja.value['numeroCaja'], 10);
    this.cajaTemp.localId = parseInt(String(local), 10) ;
    this.cajaTemp.tipoCaja = parseInt(caja.value['tipoCaja'], 10);
    return this.http.post(`${this.apiUrl}/cajas`, this.cajaTemp);
  }
  deleteCaja(caja: CajaModel){
    return this.http.delete(`${this.apiUrl}/cajas/${caja.cajaId}`);
  }
  updateCaja(caja: any, local: number){
    this.cajaTemp = new CajaModel();
    this.cajaTemp.cajaId = parseInt(caja.value['cajaId'], 10);
    this.cajaTemp.numeroCaja = parseInt(caja.value['numeroCaja'], 10);
    this.cajaTemp.localId = parseInt(String(local), 10) ;
    this.cajaTemp.tipoCaja = parseInt(caja.value['tipoCaja'], 10);
    console.log(this.cajaTemp);
    return this.http.put(`${this.apiUrl}/cajas/${this.cajaTemp.cajaId}`, this.cajaTemp);
  }

}
