import { Component, OnInit } from '@angular/core';
import {LocalesService} from '../../services/locales/locales.service';
import {LocalModel} from '../../models/Local.model';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';


@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.css']
})
export class LocalesComponent implements OnInit {
  muestraNuevo = false;
  locales: LocalModel[] = [];
  cargando = false;
  error: string;
  constructor(private localesService: LocalesService, private router: Router ) {
    this.cargando = true;
    this.getLocales();
  }

  ngOnInit(){

  }

  nuevoLocal(){
    return this.muestraNuevo = !this.muestraNuevo;
  }

  hasRoute() {
    return this.router.url;
  }

  getLocales(){
    this.localesService.getLocales()
        .subscribe((resp: LocalModel[]) => {
          this.locales = resp;
          this.cargando = false;
        });
  }

  deleteLocal(local: LocalModel, i: number){
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Está Seguro que desea borrar a "${local.nombreLocal}"`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value){
        this.localesService.deleteLocal(local.localId)
            .subscribe( request => {
                  Swal.fire({
                    title: 'Borrar Local',
                    text: 'Se Elimino Local Correctamente',
                    icon: 'success'
                  });
                  this.locales.splice(i, 1);
                },
                (error) => {
                  console.log(error.error.message);
                  this.error = error.error.message;
                  Swal.fire({
                    title: 'Acción No permitida',
                    text: this.error.toUpperCase(),
                    icon: 'error'
                  });
                });
      }
    });
  }
}
