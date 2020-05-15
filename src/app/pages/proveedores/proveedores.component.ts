import { Component, OnInit } from '@angular/core';
import {ProveedorModel} from '../../models/Proveedor.model';
import {ProveedoresService} from '../../services/proveedores/proveedores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  proveedores: ProveedorModel[] = [];
  cargando: boolean;
  error: any;

  constructor( private proveedoresService: ProveedoresService) {
    this.cargando = true;
    this.getAll();
  }

  ngOnInit(): void {
  }

  delete(proveedor: ProveedorModel, i: number){
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Está Seguro que desea borrar a "${proveedor.nombreProveedor}"`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value){
        this.proveedoresService.delete(proveedor.proveedorId)
            .subscribe( request => {
                  Swal.fire({
                    title: 'Borrar Proveedor',
                    text: 'Se Elimino proveedor Correctamente',
                    icon: 'success'
                  });
                  this.proveedores.splice(i, 1);
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

  private getAll() {
    this.proveedoresService.getAll()
        .subscribe((resp: ProveedorModel[]) => {
          this.proveedores = resp;
          this.cargando = false;
        }, (error) => console.log(error));
  }

}
