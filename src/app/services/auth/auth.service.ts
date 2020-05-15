import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalConstants} from '../../models/globalConstants';
import {UserModel} from '../../models/User.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = GlobalConstants.apiURL;
  token: string;
  constructor(private http: HttpClient) {
    this.leerToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(form: UserModel){
    console.log('entrando en servicio');
    return this.http.post(`${this.url}/Account/Login`, form)
        .pipe(
              map( resp => {
              console.log(resp);
              this.guardarToken('Bearer ' + resp['token'] );
              return resp;
            })
        );
  }
  private guardarToken(authToken: string){
    localStorage.setItem('token', authToken);
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


