import { Component, OnInit } from '@angular/core';
import {MesaModel} from '../../models/Mesa.model';
import {ActivatedRoute} from '@angular/router';
import {MesasService} from '../../services/mesas/mesas.service';
import Swal from 'sweetalert2';
import {NgForm} from '@angular/forms';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-mesas',
    templateUrl: './mesas.component.html',
    styleUrls: ['./mesas.component.css']
})
export class MesasComponent implements OnInit {

    local: any;
    cargando = false;
    content: any;
    mesas: MesaModel[] = [];
    mesa: MesaModel;
    error: string;
    update: boolean;

    constructor(private route: ActivatedRoute, private mesasService: MesasService, config: NgbModalConfig, private modalService: NgbModal ) {
        this.route.parent.params.subscribe((params) => this.local = params);
        this.getMesas(this.local.id);
        config.backdrop = 'static';
        config.keyboard = false;
        this.update = false;
        this.cargando = true;
    }
    ngOnInit(): void {
    }
    getMesas(local: number){
        this.mesasService.getMesas(local)
            .subscribe((resp: MesaModel[]) => {
                this.mesas = resp;
                this.cargando = false;
            } );
    }
    getMesa(idx: number){
        return this.mesasService.getMesa(idx)
            .subscribe( (request: MesaModel) => this.mesa = request);
    }
    deleteMesa(mesa: MesaModel, i: number) {
        Swal.fire({
            title: '¿Está Seguro?',
            text: `Está Seguro que desea borrar la mesa ${mesa.numeroMesa}"`,
            icon: 'question',
            showConfirmButton: true,
            showCancelButton: true
        }).then(resp => {
            Swal.showLoading();
            if (resp.value) {
                this.mesasService.deleteMesa(mesa)
                    .subscribe((request: any) => {
                        this.mesas.splice(i, 1);
                        Swal.fire({
                            title: 'Borrar Mesa ',
                            text: request.message.toUpperCase(),
                            icon: 'success'
                        });
                    }, (error) => {
                        Swal.fire({
                            title: 'Borrar Mesa ',
                            text: error.error.message.toUpperCase(),
                            icon: 'error'
                        });
                    });
            }
        });
    }

    addMesa(forma: NgForm, update?: boolean) {
        if (!update){
            if ( !forma.invalid){
                this.mesasService.addMesa(forma, this.local.id)
                    .subscribe(resp => {
                        Swal.fire({
                            title: 'Crear Mesa ',
                            text: 'La Mesa Ha sido Creada',
                            icon: 'success'
                        });
                        this.getMesas(this.local.id);
                    }, ( error: any )  => {
                        console.log(this.update);
                        Swal.fire({
                            title: 'Crear Mesa ',
                            text: error.error.message.toUpperCase(),
                            icon: 'error'
                        });
                    });
            }
        }else{
            if ( !forma.invalid){
                this.mesasService.updateMesa(forma, this.local.id)
                    .subscribe(request => {
                        this.update = false;
                        this.getMesas(this.local.id);
                    }, ( error )  => {
                        console.log(this.update);
                        this.update = false;
                        Swal.fire({
                                title: 'Actualizar Mesa ',
                                text: error.error.message.toUpperCase(),
                                icon: 'error'
                            }
                        );
                    });
            }
        }
    }
    open(content, mesa: MesaModel, update?: boolean) {
        if (update){
            return this.mesasService.getMesa(mesa.mesaId)
                .subscribe((request: MesaModel) => {
                    this.update = update;
                    this.mesa = request;
                    this.modalService.open(content);
                });
        }
        this.mesa = new MesaModel();
        this.modalService.open(content);
    }
}
