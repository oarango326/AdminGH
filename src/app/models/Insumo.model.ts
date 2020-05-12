import {unidadMedidaEnum} from './UnidadMedidaEnum';

export class InsumoModel {
    insumoId: number;
    nombreInsumo: string;
    unidadMedida: unidadMedidaEnum;
    stockActual: number;
    ultimoCosto: number;
    stockMin: number;
    stockMax: number;
    disponibleMenu: boolean;

    constructor() {
        this.unidadMedida =  null;
        this.stockActual = 0;
        this.ultimoCosto = 0;
        this.stockMin = 0;
        this.stockMax = 0;
        this.disponibleMenu = null;
    }
}
