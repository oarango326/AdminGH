export class MesaModel{
    mesaId: number;
    numeroMesa: number;
    activa: boolean;
    fechaReserva?: Date;
    inicioReserva?: Date;
    localId: number;
    numeroPlazas: number;

    constructor() {
        this.mesaId = 0;
        this.activa = false;
    }
}
