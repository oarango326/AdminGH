import {Component, OnInit} from '@angular/core';
import {PlatosService} from '../../services/platos/platos.service';
import {PlatoModel} from '../../models/Plato.model';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InsumosService} from '../../services/insumos/insumos.service';
import {InsumoModel} from '../../models/Insumo.model';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-platos',
  templateUrl: './platos.component.html',
  styleUrls: ['./platos.component.css']
})
export class PlatosComponent implements OnInit {
  platos: PlatoModel[] = [];
  insumos: InsumoModel[] = [];
  cargando: true ;
  plato: PlatoModel;
  localId: number;
  form: any;
  modo: string;
  medida: string;
  idx: number;


  constructor(private platosService: PlatosService, private  ar: ActivatedRoute,
              private router: Router, config: NgbModalConfig,
              private modalService: NgbModal, private fb: FormBuilder,
              private insumosService: InsumosService){
    this.ar.parent.params.subscribe((resp) => {
      this.localId = resp.id;
    });
    config.backdrop = 'static';
    config.keyboard = false;
    this.cargaInsumos();
    this.creaformulario();
    this.medida = '';
    this.getAllById(this.localId);
  }

  getAllById(localId: number){
    this.platosService.getAllByLocal(localId)
        .subscribe((resp: PlatoModel[]) => this.platos = resp);
  }

  ngOnInit(): void {
  }

  get platoDetalle(){
    return this.form.get('platoDetalle') as FormArray;
  }
  get insumoId(){
    return this.form.get('insumoId');
  }
  get nombrePlatoNoValido(){
    return this.form.get('nombrePlato').invalid && this.form.get('nombrePlato').touched;
  }

  get precioPlatoNoValido(){
    return this.form.get('precioPlato').invalid && this.form.get('precioPlato').touched;
  }

  creaformulario(){
    this.form = this.fb.group({
      platoId: [''],
      nombrePlato: ['', [Validators.required, Validators.minLength(3)]],
      precioPlato: ['', Validators.required],
      activo: [true, Validators.required],
      disponible: [false, Validators.required],
      platoDetalle: this.fb.array([this.fb.group({
        id: [0],
        insumoId: ['', Validators.required],
        cantidad: ['', Validators.required],
        medida: ['', Validators.required]
      })])
    });
  }

  addLinea(){
    this.platoDetalle.push(this.fb.group({
          id: [0],
          insumoId: ['', Validators.required],
          cantidad: ['', Validators.required],
          medida: ['', Validators.required]
        }));
  }

  open(content: any, modo: string, idx?: number) {
    this.modalService.open(content, { scrollable: true, size: 'lg' , backdrop: 'static'});
    this.modo = modo;
    if (this.modo === 'edit'){
      this.getById(idx);
    }
  }

  delete(plato: PlatoModel, i: number) {
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Está Seguro que desea borrar el Plato ${plato.nombrePlato}"`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.platosService.delete(plato.platoId)
            .subscribe((request: any) => {
              this.platos.splice(i, 1);
              Swal.fire({
                title: 'Borrar Plato ',
                text: request.message.toUpperCase(),
                icon: 'success'
              });
            }, (error) => {
              Swal.fire({
                title: 'Borrar Plato ',
                text: error.error.message.toUpperCase(),
                icon: 'error'
              });
            }
          );
        }
    });
  }

  add(form: FormGroup) {
    let peticion: Observable<any>;
    if (this.form.invalid) {
      return Object.values(form.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( control => control.markAllAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    if (form.valid){
      form.value.platoId = 0;
      form.value.localId = this.localId;
      Swal.fire({
        title: 'Espere',
        text: 'Guardando Nuevo Local',
        icon: 'info'
      });
      Swal.showLoading();
      peticion = this.platosService.add(form.value);
      peticion.subscribe((resp: PlatoModel) => {
                Swal.fire({
                  title: form.value.nombrePlato,
                  text: 'Se Guardo Plato',
                  icon: 'success',
                  allowOutsideClick: false,
                  allowEnterKey: true,
                  allowEscapeKey: false
                });
                this.getAllById(this.localId);
              },
              error => console.log(error));
    }
  }

  update(form: FormGroup) {
    let peticion: Observable<any>;
    Swal.fire({
      title: 'Espere',
      text: 'Actualizando Plato ',
      icon: 'info'
    });
    Swal.showLoading();

    peticion = this.platosService.update(form.value, form.value.platoId),
     peticion.subscribe( resp => {
       Swal.fire({
         title: this.plato.nombrePlato,
         text: 'Se actualizo Plato',
         icon: 'success'
       });
     }, error => {
       Swal.fire({
         title: this.plato.nombrePlato,
         text: 'Error al Actualizar Plato',
         icon: 'error'
       });
     });
  }

  deleteLinea(i: number) {
    this.platoDetalle.removeAt(i);
  }

  private cargaInsumos() {
    this.insumosService.getAll()
        .subscribe((resp: InsumoModel[]) => this.insumos = resp);
  }

  asignaMedida(i?: number) {
   const insumoId = this.platoDetalle.controls[i].value.insumoId;
   const medida = this.platoDetalle.controls[i].get('medida');
   this.insumosService.getById(insumoId)
     .subscribe((resp: any) => {
       if (resp.unidadMedida === 1){
         medida.setValue('Unidad');
       }
       if (resp.unidadMedida === 2){
         medida.setValue('Kilogramo');
       }else{
         medida.setValue('Litro');
       }
     });
  }

  getById(idx: number){
    this.platosService.getById(idx)
        .subscribe((resp: PlatoModel) => {
          this.plato = resp;
          this.cargaDatos();
        });
  }

  private cargaDatos() {
    if (this.modo === 'edit'){
      this.form.reset({
        platoId: this.plato.platoId,
        nombrePlato: this.plato.nombrePlato,
        precioPlato: this.plato.precioPlato,
        activo: this.plato.activo,
        disponible: this.plato.disponible
      });
      this.platoDetalle.removeAt(0);
      let i = 0;
      for (const detalle of this.plato.platoDetalle){
        this.platoDetalle.push(this.fb.group({
              id: detalle.id,
              insumoId: detalle.insumoId,
              cantidad: detalle.cantidad,
              medida: ''
            })
        );
        this.asignaMedida(i);
        i++;
      }
    }
  }


}
