import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../models/globalConstants';
import {MesaModel} from '../../models/Mesa.model';

@Injectable({
  providedIn: 'root'
})
export class MesasService {
  apiUrl = GlobalConstants.apiURL;
  private mesaTemp: MesaModel;
  constructor(private http: HttpClient) { }

  getMesas(local: number){
    return this.http.get(`${this.apiUrl}/Mesas/local/${local}`);
  }
  getMesa(idx: number){
    return this.http.get(`${this.apiUrl}/Mesas/${idx}`);
  }

  addMesa(mesa: any, local: number){
    this.mesaTemp = new MesaModel();
    this.mesaTemp.numeroMesa = parseInt(mesa.value['numeroMesa'], 10);
    this.mesaTemp.localId = parseInt(String(local), 10) ;
    this.mesaTemp.numeroPlazas = parseInt(mesa.value['numeroPlazas'], 10);
    return this.http.post(`${this.apiUrl}/Mesas`, this.mesaTemp);
  }
  deleteMesa(mesa: MesaModel){
    return this.http.delete(`${this.apiUrl}/Mesas/${mesa.mesaId}`);
  }
  updateMesa(mesa: any, local: number){
    this.mesaTemp = new MesaModel();
    this.mesaTemp.mesaId = parseInt(mesa.value['mesaId'], 10);
    this.mesaTemp.numeroMesa = parseInt(mesa.value['numeroMesa'], 10);
    this.mesaTemp.localId = parseInt(String(local), 10) ;
    this.mesaTemp.numeroPlazas = parseInt(mesa.value['numeroPlazas'], 10);
    console.log(this.mesaTemp);
    return this.http.put(`${this.apiUrl}/Mesas/${this.mesaTemp.mesaId}`, this.mesaTemp);
  }


}
