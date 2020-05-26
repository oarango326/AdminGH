import { Component, OnInit } from '@angular/core';
import {ProveedorModel} from '../../../models/Proveedor.model';
import {ProveedoresService} from '../../../services/proveedores/proveedores.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InsumosService} from '../../../services/insumos/insumos.service';
import {InsumoModel} from '../../../models/Insumo.model';
import {LocalesService} from '../../../services/locales/locales.service';
import {LocalModel} from '../../../models/Local.model';
import {AlmacenesService} from '../../../services/almacenes/almacenes.service';
import {AlmacenModel} from '../../../models/Almacen.model';
import {BsDatepickerConfig, BsLocaleService} from 'ngx-bootstrap/datepicker';
import {defineLocale, esLocale, parseDate} from 'ngx-bootstrap/chronos';
import {ComprasService} from '../../../services/compras/compras.service';
import {ActivatedRoute} from '@angular/router';
import {CompraModel} from '../../../models/Compra.model';
import {of} from 'rxjs';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})

export class CompraComponent implements OnInit {
    proveedores: ProveedorModel[] = [];
    modo: string;
    form: FormGroup;
    insumos: InsumoModel[] = [];
    locales: LocalModel[] = [];
    almacenes: AlmacenModel[];
    bsConfig: Partial<BsDatepickerConfig>;
    idx: number;
    compra: CompraModel;

  constructor( private  proveedoresService: ProveedoresService, private fb: FormBuilder,
               private insumosService: InsumosService, private localesService: LocalesService,
               private almacenesService: AlmacenesService, private localeService: BsLocaleService,
               private comprasService: ComprasService, private ar: ActivatedRoute) {



              this.cargarProveedores();
              this.cargarInsumos();
              this.cargaLocales();
              this.setDatepickerLanguage();
              this.bsConfig = Object.assign({}, {containerClass: 'theme-default'});
              this.modo = 'add';
              this.crearFormulario();
              this.ar.url.subscribe(params => {
                if ( params.length === 3){
                  this.modo = params[2].path;
                }
              });
              if (this.modo === 'edit'){
                this.ar.params.subscribe(params => {
                  this.idx = params.id;
                  this.getById( this.idx);
                });
              }
  }

  ngOnInit(): void {
  }

  get compraDetalle(){
    return this.form.get('compraDetalle') as FormArray;
  }

  get montoCompra() {
    return this.form.get('totalCompra');
  }

  get saldoPendiente() {
    return this.form.get('saldoPendiente');
  }

  setDatepickerLanguage() {
    defineLocale('es', esLocale);
    this.localeService.use('es');
  }

  private cargarProveedores() {
    this.proveedoresService.getAll()
        .subscribe((resp: ProveedorModel[]) => this.proveedores = resp);
  }

  private cargarInsumos() {
    this.insumosService.getAll()
        .subscribe((resp: InsumoModel[]) => this.insumos = resp);
  }

  private crearFormulario() {
    this.form = this.fb.group({
      compraId: [''],
      estadoCompra: [''],
      fecha: ['', Validators.required],
      observacion: ['', Validators.maxLength(50)],
      localId: ['', Validators.required],
      proveedorId: ['', Validators.required],
      saldoPendiente: ['', Validators.required],
      totalCompra: ['', Validators.required],
      compraDetalle: this.fb.array([this.fb.group({
        id: [''],
        insumoId: ['', Validators.required],
        almacenId: ['', Validators.required],
        cantidad: ['', Validators.required],
        precio: ['', Validators.required],
        totalLinea : ['', Validators.required],
      })]),
    });
  }


  add(form: FormGroup) {
    if (!this.form.invalid){
      form.value.compraId = 0;
      form.value.estadoCompra = 'pendiente';
      this.comprasService.add(form.value)
          .subscribe(resp => console.log(resp),
                  error => console.log(error));
    }
  }

  update(form: FormGroup) {
  }

  addCompraDetalle() {
    this.compraDetalle.push(this.fb.group({
      id: [0],
      insumoId: ['', Validators.required],
      almacenId: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      totalLinea : [''],
      })
    );
  }

  private getById(idx: number) {
   return this.comprasService.getById(idx)
        .subscribe( (resp: CompraModel) => {
              this.compra = resp;
              this.cargaDatos();
        } ,
            error => console.log(error));
  }

  removeCompraDetalle(i: number) {
    this.compraDetalle.removeAt(i);
    this.calculaTotal();
  }


  private cargaLocales() {
    this.localesService.getLocales()
        .subscribe((resp: LocalModel[]) => this.locales = resp);
  }

  cargaAlmacenes() {
    const idx = this.form.controls.localId.value;
    this.almacenesService.getByLocalId(idx)
        .subscribe((resp: AlmacenModel[]) => this.almacenes = resp);
  }

  calculaLinea(i: number) {
    const cantidad = this.form.controls.compraDetalle.value[i].cantidad;
    const precio = this.form.controls.compraDetalle.value[i].precio;
    const total = cantidad * precio;
    this.compraDetalle.controls[i].get('totalLinea').setValue(total);
    this.calculaTotal();
  }

  calculaTotal(){
    let total = 0;
    for (const valor of this.compraDetalle.value){
        total += valor.totalLinea;
    }
    this.montoCompra.setValue(total);
    this.saldoPendiente.setValue(total);
  }

  private cargaDatos(){
    this.form.reset({
      compraId: this.compra.compraId,
      estadoCompra: this.compra.estadoCompra,
      fecha: parseDate(this.compra.fecha),
      observacion: this.compra.observacion,
      localId: this.compra.localId,
      proveedorId: this.compra.proveedorId,
      saldoPendiente: this.compra.saldoPendiente,
      totalCompra: this.compra.totalCompra,
    });
    this.compraDetalle.removeAt(0);
    for (const detalle of this.compra.compraDetalle){
      this.compraDetalle.push(this.fb.group({
            id: [detalle.id],
            insumoId: [detalle.insumoId, Validators.required],
            almacenId: [detalle.almacenId, Validators.required],
            cantidad: [detalle.cantidad, Validators.required],
            precio: [detalle.precio, Validators.required],
            totalLinea : [detalle.cantidad * detalle.precio],
          })
      );
    }
    this.cargaAlmacenes();
  }



}

