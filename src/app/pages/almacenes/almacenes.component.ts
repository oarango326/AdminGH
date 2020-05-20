import { Component, OnInit } from '@angular/core';
import {AlmacenModel} from '../../models/Almacen.model';
import {AlmacenesService} from '../../services/almacenes/almacenes.service';
import {InsumoModel} from '../../models/Insumo.model';
import Swal from "sweetalert2";

@Component({
  selector: 'app-almacenes',
  templateUrl: './almacenes.component.html',
  styleUrls: ['./almacenes.component.css']
})
export class AlmacenesComponent implements OnInit {
  cargando: boolean;
  almacenes: AlmacenModel[] = [];
  error: any;

  constructor( private almacenesService: AlmacenesService) {
    this.cargando = true;
    this.getAll();
  }

  ngOnInit(): void {
  }


  private getAll() {
    this.almacenesService.getAll()
        .subscribe((resp: AlmacenModel[]) => {
         console.log(resp);
         this.almacenes = resp;
         this.cargando = false;
        });
    }



    delete(almacen: AlmacenModel, i: number){
        Swal.fire({
            title: '¿Está Seguro?',
            text: `Está Seguro que desea borrar a "${almacen.descripcion}"`,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(resp => {
            if (resp.value){
                this.almacenesService.delete(almacen.almacenId)
                    .subscribe( request => {
                            Swal.fire({
                                title: 'Borrar Almacen',
                                text: 'Se Elimino Almacen Correctamente',
                                icon: 'success'
                            });
                            this.almacenes.splice(i, 1);
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


}
