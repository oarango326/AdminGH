import {platoDetalleModel} from './PlatoDetalle.model';

export class PlatoModel{
    platoId: number;
    nombrePlato: string;
    activo: boolean;
    disponible: boolean;
    localId: number;
    precioPlato: number;
    stockDisponible: number;
    platoDetalle: platoDetalleModel[];
}

