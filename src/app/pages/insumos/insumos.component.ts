import { Component, OnInit } from '@angular/core';
import {InsumosService} from '../../services/insumos/insumos.service';
import {InsumoModel} from '../../models/Insumo.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-insumos',
  templateUrl: './insumos.component.html',
  styleUrls: ['./insumos.component.css']
})
export class InsumosComponent implements OnInit {

  muestra: boolean;
  insumos: InsumoModel[] = [] ;
  cargando: boolean;
  content: any;
  update: boolean;
  error: any;

  constructor( private insumosService: InsumosService, private router: Router) {
    this.muestra = false;
    this.cargando = true;
    this.getAll();
  }

  ngOnInit(): void {
  }
  getAll(){
    this.insumosService.getAll()
        .subscribe( (request: InsumoModel[]) => {
          this.cargando = false;
          this.insumos = request;
          this.muestra = true;
        } );
  }

  delete(insumo: InsumoModel, i: number){
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Está Seguro que desea borrar a "${insumo.nombreInsumo}"`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value){
        this.insumosService.delete(insumo.insumoId)
            .subscribe( request => {
                  Swal.fire({
                    title: 'Borrar Insumo',
                    text: 'Se Elimino Insumo Correctamente',
                    icon: 'success'
                  });
                  this.insumos.splice(i, 1);
                },
                (error) => {
                  console.log(error.error.message);
                  this.error = error.error.message;
                  Swal.fire({
                    title: 'Acción No permitida',
                    text: this.error.toUpperCase(),
                    icon: 'error'
                  });
                } );
      }
    });
  }

  hasRoute() {
    return this.router.url;
  }

  mostrar(){
    return  this.muestra = !this.muestra;
  }

}
