import {LocalModel} from './Local.model';
import {ProveedorModel} from './Proveedor.model';
import {CompraDetalleModel} from './CompraDetalle.model';

export class CompraModel{
    compraId: number;
    estadoCompra: string;
    fecha: Date;
    saldoPendiente: number;
    totalCompra: number;
    observacion: string;
    proveedorId: number;
    proveedor: ProveedorModel;
    localId: number;
    almacenId: number;
    local: LocalModel;
    compraDetalle: CompraDetalleModel[];

    constructor() {
        this.estadoCompra = 'pendiente';
    }
}
