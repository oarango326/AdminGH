import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserModel} from '../models/User.model';
import {AuthService} from '../services/auth/auth.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 usuario: UserModel;

  constructor( private authService: AuthService, private router: Router) {
    this.usuario = new UserModel();
  }

  ngOnInit(): void {
  }
  onSubmit(form: NgForm) {
      if (!form.invalid) {
      Swal.fire({
          allowOutsideClick: false,
          text: 'Espere por favor ...',
          icon: 'info'
      });
      Swal.showLoading();
      this.authService.login(form.value)
         .subscribe( resp => {
            Swal.close();
            this.router.navigateByUrl('/dashboard');
         }, (error) => {
                console.log(error);
                Swal.fire({
                     icon: 'error',
                     title: 'Error al autenticar',
                     text: 'Intento de login Invalido'
                 });
         });
     }
  }



}
