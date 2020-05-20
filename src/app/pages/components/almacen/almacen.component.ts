import { Component, OnInit } from '@angular/core';
import {AlmacenesService} from '../../../services/almacenes/almacenes.service';
import {AlmacenModel} from '../../../models/Almacen.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LocalesService} from '../../../services/locales/locales.service';
import {LocalModel} from '../../../models/Local.model';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrls: ['./almacen.component.css']
})
export class AlmacenComponent implements OnInit {
    modo: string;
    almacen: AlmacenModel;
    locales: LocalModel[] = [];
    form: FormGroup;
    idx: number;

  constructor( private ar: ActivatedRoute, private router: Router, private fb: FormBuilder,
               private almacenesService: AlmacenesService, private localesService: LocalesService) {
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
    this.crearformulario();
    this.llenarLocales();
  }

  ngOnInit(): void {
  }
  get descripcionLocal(){
    return this.form.get('descripcion').invalid && this.form.get('descripcion').touched;
  }
  get almacenlocalId(){
    return this.form.get('localId').invalid && this.form.get('localId').touched;
  }

  crearformulario(){
    this.form = this.fb.group({
      almacenId: [''],
      descripcion: ['', [Validators.required, Validators.minLength(5) ]],
      localId: ['']
    });
  }


  private llenarLocales(){
    this.localesService.getLocales()
        .subscribe((resp: LocalModel[]) => {
          this.locales = resp;
        });
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
        text: 'Actualizando almacen',
        icon: 'info'
      });
      Swal.showLoading();
      peticion = this.almacenesService.update(form.value , this.idx);
      peticion.subscribe(resp => {
        Swal.fire({
          title: this.almacen.descripcion,
          text: 'Se actualizo almacen',
          icon: 'success'
        });
      }, (error) => {
        console.log(error);
        Swal.fire({
          title: this.almacen.descripcion,
          text: 'Error al Actualizar almacen',
          icon: 'error'
        });
      });
    }
  }


  add(form: FormGroup) {
    let peticion: Observable<any>;
    form.value.almacenId = 0;
    if (form.invalid){
      Object.values(form.controls).forEach( control => {
        control.markAsTouched();
      });
    }else{
      Swal.fire({
        title: 'Espere',
        text: 'Creando nuevo almacen',
        icon: 'info'
      });
      Swal.showLoading();
      peticion = this.almacenesService.add(form.value);
      peticion.subscribe((resp: AlmacenModel) => {
        Swal.fire({
          title: 'Nuevo Almacen',
          text: 'Se creo nuevo Almacen',
          icon: 'success'
        });
        this.router.navigateByUrl(`/almacenes/${resp.almacenId}/edit`);
      }, (error) => {
        Swal.fire({
          title: this.almacen.descripcion,
          text: 'Error al crear Almacen',
          icon: 'error'
        });
      });
    }
  }

  private getById(idx: number) {
    this.almacenesService.getById(idx)
        .subscribe((resp: AlmacenModel) => {
          this.almacen = resp;
          this.cargaDatos();
        });
  }


  private cargaDatos(){
    this.form.reset({
      almacenId: this.almacen.almacenId,
      descripcion: this.almacen.descripcion,
      localId: this.almacen.localId,
    });
  }
}
