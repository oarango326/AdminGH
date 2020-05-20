import { Component, OnInit } from '@angular/core';
import {ComprasService} from '../../services/compras/compras.service';
import {CompraModel} from '../../models/Compra.model';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {
  muestra: any;
  compras: CompraModel[] = [];
  cargando: boolean;

  constructor( private comprasService: ComprasService) {
    this.muestra = true;
    this.comprasService.getAll().subscribe((resp: any) =>{
      console.log(resp);
      this.compras = resp;
    });
  }

  ngOnInit(): void {
  }

  delete(insumo: any, i: number) {

  }
}
