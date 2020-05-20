import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProveedoresService} from '../../../services/proveedores/proveedores.service';
import {ProveedorModel} from '../../../models/Proveedor.model';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  modo: string;
  form: FormGroup;
  proveedor: ProveedorModel;
  idx: number;

  constructor(private fb: FormBuilder, private ar: ActivatedRoute,
              private proveedoresService: ProveedoresService, private router: Router) {
    this.modo = 'add';
    this.ar.url.subscribe(params => {
      if ( params.length === 3) {
        this.modo = params[2].path;
      }
    });

    if (this.modo === 'edit'){
      this.ar.params.subscribe(params => {
        this.idx = params.id;
        this.getById( this.idx);
      });
    }
    this.crearFormulario();
  }

  get nombreProveedor(){
    return this.form.get('nombreProveedor').invalid && this.form.get('nombreProveedor').touched;
  }
  get cifProveedor(){
    return this.form.get('cif').invalid && this.form.get('cif').touched;
  }
  get direccionProveedor(){
    return this.form.get('direccion').invalid && this.form.get('direccion').touched;
  }
  get telefonoProveedor(){
    return this.form.get('telefono').invalid && this.form.get('telefono').touched;
  }
  get emailProveedor(){
    return this.form.get('email').invalid && this.form.get('email').touched;
  }

  ngOnInit(): void {
  }

  private crearFormulario() {
    this.form = this.fb.group({
      proveedorId: [''],
      nombreProveedor: ['', [Validators.required, Validators.minLength(5) ]],
      cif: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9) ]],
      direccion: ['', [ Validators.required, Validators.maxLength(100)]],
      telefono: ['', [Validators.required, Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  add(form: FormGroup) {
    let peticion: Observable<any>;
    form.value.proveedorId = 0;
    if (form.invalid){
      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
    }else{
      Swal.fire({
        title: 'Espere',
        text: 'Creando nuevo Proveedor',
        icon: 'info'
      });
      Swal.showLoading();
      peticion = this.proveedoresService.add(form.value);
      peticion.subscribe((resp: ProveedorModel) => {
        Swal.fire({
          title: 'Nuevo Proveedor',
          text: 'Se creo nuevo Proveedor',
          icon: 'success'
        });
        this.router.navigateByUrl(`/proveedores/${resp.proveedorId}/edit`);
      }, (error) => {
        Swal.fire({
          title: this.proveedor.nombreProveedor,
          text: 'Error al Actualizar Insumo',
          icon: 'error'
        });
      });
    }
  }

  update(form: FormGroup) {
    let peticion: Observable<any>;
    if (form.invalid) {
      Object.values(form.controls).forEach(control => {
        control.markAsTouched();
      });
    }else{
      Swal.fire({
        title: 'Espere',
        text: 'Actualizando Proveedor',
        icon: 'info'
      });
      Swal.showLoading();
      peticion = this.proveedoresService.update(form.value , this.idx);
      peticion.subscribe(resp => {
        Swal.fire({
          title: this.proveedor.nombreProveedor,
          text: 'Se actualizo Proveedor',
          icon: 'success'
        });
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: this.proveedor.nombreProveedor,
          text: 'Error al Actualizar Proveedor',
          icon: 'error'
        });
      });
    }
  }




  getById(idx: number){
    this.proveedoresService.getById(idx)
        .subscribe((resp: ProveedorModel) => {
          this.proveedor = resp;
          this.cargaDatos();
        });
  }



  private cargaDatos(){
    this.form.reset({
      proveedorId: this.proveedor.proveedorId,
      nombreProveedor: this.proveedor.nombreProveedor,
      cif: this.proveedor.cif,
      direccion: this.proveedor.direccion,
      telefono: this.proveedor.telefono,
      email: this.proveedor.email
    });
  }

}
