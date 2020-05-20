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

  constructor( private  proveedoresService: ProveedoresService, private fb: FormBuilder,
               private insumosService: InsumosService, private localesService: LocalesService,
               private almacenesService: AlmacenesService) {
    this.modo = 'add';
    this.crearFormulario();
    this.cargarProveedores();
    this.cargarInsumos();
    this.cargaLocales();
  }

  ngOnInit(): void {
  }

  get compraDetalle(){
    return this.form.get('compraDetalle') as FormArray;
  }

  private cargarProveedores() {
    this.proveedoresService.getAll()
        .subscribe((resp: ProveedorModel[]) => this.proveedores = resp);
  }

  private cargarInsumos() {
    this.insumosService.getAll()
        .subscribe((resp: InsumoModel[]) => this.insumos = resp);
  }

  update(form: FormGroup) {
  }

  add(form: FormGroup) {
    console.log(form);
  }

  private crearFormulario() {
    this.form = this.fb.group({
      compraId: [''],
      estadoCompra: [''],
      fecha: ['', Validators.required],
      observacion: ['', Validators.maxLength(50)],
      localId: ['', Validators.required],
      proveedorId: ['', Validators.required],
      saldoPendiente: [''],
      totalCompra: [''],
      compraDetalle: this.fb.array([this.fb.group({
        id: ['', Validators.required],
        cantidad: ['', Validators.required],
        precio: ['', Validators.required],
        almacenId: ['']
      })]),
    });
  }

  addCompraDetalle() {
    this.compraDetalle.push(this.fb.group({
      id: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      almacenId: ['']
      })
    );
  }

  removeCompraDetalle(i: number) {
    this.compraDetalle.removeAt(i);
  }


  private cargaLocales() {
    this.localesService.getLocales()
        .subscribe((resp: LocalModel[]) => this.locales = resp);
  }

  cargaAlmacenes() {
    const idx = this.form.controls['localId'].value;
    this.almacenesService.getByLocalId(idx)
        .subscribe((resp: AlmacenModel[]) => this.almacenes = resp);
  }


  incremeta() {
    console.log(this.form);
    console.log(this.form.controls['compraDetalle']);
  }
  disminuye(){

  }
}
