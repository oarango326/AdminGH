import { Component, OnInit } from '@angular/core';
import {CajaModel} from '../../models/Caja.model';
import {ActivatedRoute} from '@angular/router';
import {CajasService} from '../../services/cajas/cajas.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-cajas',
  templateUrl: './cajas.component.html',
  styleUrls: ['./cajas.component.css']
})
export class CajasComponent implements OnInit {

  caja: CajaModel;
  cajas: CajaModel[] = [];
  content: any;
  cargando: boolean;
  update: boolean;
  local: any;
  error: string;

  constructor(private route: ActivatedRoute, private cajasService: CajasService,
              config: NgbModalConfig, private modalService: NgbModal) {
    this.route.parent.params.subscribe((params) => this.local = params);
    this.getCajas(this.local.id);
    config.backdrop = 'static';
    config.keyboard = false;
    this.update = false;
    this.cargando = true;
  }

  ngOnInit(): void {
  }

  open(content, caja: CajaModel, update?: boolean) {
    if (update){
      return this.cajasService.getCaja(caja.cajaId)
          .subscribe((request: CajaModel) => {
            this.update = update;
            this.caja = request;
            this.modalService.open(content);
          });
    }
    this.caja = new CajaModel();
    this.modalService.open(content);
  }

  deleteCaja(caja: CajaModel, i: number) {
    Swal.fire({
      title: '¿Está Seguro?',
      text: `Está Seguro que desea borrar la caja ${caja.numeroCaja}"`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.cajasService.deleteCaja(caja)
            .subscribe((request: any) => {
              this.cajas.splice(i, 1);
              Swal.fire({
                title: 'Borrar Caja ',
                text: request.message.toUpperCase(),
                icon: 'success'
              });
            }, (error) => {
              Swal.fire({
                title: 'Borrar Caja ',
                text: error.error.message.toUpperCase(),
                icon: 'error'
              });
            });
      }
    });
  }

  addCaja(forma: NgForm, update?: boolean) {
    console.log('clic en guardar');
    if (!update){
      if ( !forma.invalid){
        this.cajasService.addCaja(forma, this.local.id)
            .subscribe(request => {
              this.getCajas(this.local.id);
            }, ( error: any )  => {
              console.log(this.update);
              Swal.fire({
                title: 'Crear Caja ',
                text: error.error.message.toUpperCase(),
                icon: 'error'
              });
            });
      }
    }else{
      if ( !forma.invalid){
        this.cajasService.updateCaja(forma, this.local.id)
            .subscribe(request => {
              this.update = false;
              this.getCajas(this.local.id);
            }, ( error )  => {
              console.log(this.update);
              this.update = false;
              Swal.fire({
                    title: 'Actualizar Caja ',
                    text: error.error.message.toUpperCase(),
                    icon: 'error'
                  }
              );
            });
      }
    }
  }

  getCajas(local: number) {
    this.cajasService.getCajas(local)
        .subscribe((resp: CajaModel[]) => {
          this.cajas = resp;
          this.cargando = false;
          console.log('cargando Cajas');
          console.log(resp);
        } );
  }

  getCaja(idx: number){
    return this.cajasService.getCaja(idx)
        .subscribe( (request: CajaModel) => this.caja = request);
  }

}
