import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import Swal from 'sweetalert2';
import {Observable} from 'rxjs';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {LocalModel} from '../../../models/Local.model';
import {LocalesService} from '../../../services/locales/locales.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.css']
})
export class LocalComponent implements OnInit {

  local = new LocalModel();
  form: FormGroup;
  modo: string;
  idx: number;

  constructor(private fb: FormBuilder, private localesService: LocalesService, private ar: ActivatedRoute, private router: Router) {
    this.modo = 'add';
    this.ar.url.subscribe((params: any) => {
      if ( params[0].path === 'info-local') {
        this.modo = 'edit';
      }
    });

    if (this.modo === 'edit'){
      this.ar.parent.url.subscribe((params: any) => {
        this.idx = params[1].path;
        this.getById(this.idx);
      });
    }
    this.crearFormulario();
//    console.log(this.modo);
  }

  ngOnInit(): void {
  }

  get nombreNovalido(){
    return this.form.get('nombreLocal').invalid && this.form.get('nombreLocal').touched;
  }
  get direccionNovalido(){
    return this.form.get('direccionLocal').invalid && this.form.get('direccionLocal').touched;
  }
  get telefonoNovalido(){
    return this.form.get('telefonoLocal').invalid && this.form.get('telefonoLocal').touched;
  }

  crearFormulario(){
    this.form = this.fb.group({
      localId: [''],
      nombreLocal: ['', [Validators.required, Validators.minLength(5)]],
      direccionLocal: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)] ],
      telefonoLocal: ['', [Validators.minLength(9), Validators.required]]
    });
  }

  add(form: FormGroup){
    let peticion: Observable<any>;
    form.value.localId = 0;
    if (this.form.invalid){
      return Object.values(form.controls).forEach( control => {
        if (control instanceof FormGroup){
          Object.values(control.controls).forEach( control =>  control.markAllAsTouched());
        }else{
          control.markAsTouched();
        }
      });
    }
    Swal.fire({
      title: 'Espere',
      text: 'Guardando Nuevo Local',
      icon: 'info'
    });
    Swal.showLoading();
    peticion = this.localesService.addLocal(form.value);
    peticion.subscribe((resp: LocalModel) => {
      Swal.fire({
        title: this.local.nombreLocal,
        text: 'Se Guardo Local',
        icon: 'success',
        allowOutsideClick: false,
        allowEnterKey: true,
        allowEscapeKey: false
      });
      this.router.navigateByUrl(`/locales/${resp.localId}/info-local`);
    }, error => console.log(error));
  }


  update(form: FormGroup) {
    let peticion: Observable<any>;
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
   else{
     Swal.fire({
       title: 'Espere',
       text: 'Actualizando Proveedor',
       icon: 'info'
     });
     Swal.showLoading();
     peticion = this.localesService.updateLocal(form.value, this.idx);
     peticion.subscribe(resp => {
       Swal.fire({
     //   title: this.local.nombreLocal,
         text: 'Se actualizo Local',
         icon: 'success'
       });
     }, (error) => {
       Swal.fire({
         title: this.local.nombreLocal,
         text: 'Error al Actualizar Local',
         icon: 'error'
       });
     });
   }
  }

  getById(idx: number) {
    this.localesService.getLocal(idx)
        .subscribe((resp: LocalModel) => {
          this.local = resp;
          this.cargaDatos();
        });
  }


  cargaDatos() {
    this.form.reset({
      localId: this.local.localId,
      nombreLocal: this.local.nombreLocal,
      direccionLocal: this.local.direccionLocal,
      telefonoLocal: this.local.telefonoLocal
    });
  }
}
