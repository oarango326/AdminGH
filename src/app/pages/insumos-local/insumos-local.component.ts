import { Component, OnInit } from '@angular/core';
import {AlmacenesService} from '../../services/almacenes/almacenes.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlmacenModel} from '../../models/Almacen.model';
import {unidadMedidaEnum} from '../../models/UnidadMedidaEnum';

@Component({
  selector: 'app-insumos-local',
  templateUrl: './insumos-local.component.html',
  styleUrls: ['./insumos-local.component.css']
})
export class InsumosLocalComponent implements OnInit {
  cargando: boolean;
  local: any;
  almacenes: AlmacenModel[] = [];
  insumos: any[] = [];
  UnidadMedidaEnum: unidadMedidaEnum;

  constructor(private almacenesService: AlmacenesService, private route: ActivatedRoute) {
    this.cargando = true;
    this.route.parent.params.subscribe((params) => this.local = params);
    this.getByLocal(this.local.id);

  }

  ngOnInit(): void {
  }

  private getByLocal(idx: number) {
    this.almacenesService.getByLocalId(idx)
        .subscribe((resp: any) => {
          this.cargando = false;
          this.almacenes = resp;
          if (this.almacenes.length > 0){
            this.cargarInsumos(this.almacenes[0].almacenId);
          }
        });
  }

  cargarInsumos(almacenId: any) {
    this.almacenesService.getAlmacenDetalleByAlmacenId(almacenId)
        .subscribe((resp: any[]) => {
          this.insumos = resp;
        });
    }
}
