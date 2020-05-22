import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// componentes
import {PagesComponent} from './pages.component';

// paginas
import {DashboardComponent} from './dashboard/dashboard.component';
import {LocalesComponent} from './locales/locales.component';
import { LocalComponent } from './components/local/local.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { InsumosComponent } from './insumos/insumos.component';
import { InfoLocalComponent } from './info-local/info-local.component';
import { MesasComponent } from './mesas/mesas.component';
import { CajasComponent } from './cajas/cajas.component';
import { AlmacenesComponent } from './almacenes/almacenes.component';

// rutas
import {PAGES_ROUTES} from './pages.routes';

// modulo Secundario
import {SharedModule} from '../shared/shared.module';


// servicios

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AlmacenComponent } from './components/almacen/almacen.component';
import { ProveedorComponent } from './components/proveedor/proveedor.component';
import { InsumoComponent } from './components/insumo/insumo.component';
import { PlatosComponent } from './platos/platos.component';
import { ComprasComponent } from './compras/compras.component';
import { CobrosComponent } from './cobros/cobros.component';
import { PagosComponent } from './pagos/pagos.component';
import { ComandasComponent } from './comandas/comandas.component';
import { InsumosLocalComponent } from './insumos-local/insumos-local.component';
import {NgbModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import { CompraComponent } from './components/compra/compra.component';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    DashboardComponent,
    LocalesComponent,
    PagesComponent,
    ProveedoresComponent,
    InsumosComponent,
    LocalComponent,
    InfoLocalComponent,
    MesasComponent,
    CajasComponent,
    AlmacenesComponent,
    AlmacenComponent,
    ProveedorComponent,
    InsumoComponent,
    PlatosComponent,
    ComprasComponent,
    CobrosComponent,
    PagosComponent,
    ComandasComponent,
    InsumosLocalComponent,
    CompraComponent
  ],
  exports: [
    PagesComponent,
    AlmacenesComponent,
    DashboardComponent,
    LocalesComponent,
      ProveedoresComponent,
      InsumosComponent,
      LocalComponent,
      InfoLocalComponent,
      MesasComponent,
      CajasComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        ReactiveFormsModule,
        FormsModule,
        NgbTooltipModule,
        NgbModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot()
    ],
  providers: [
  ],
})
export class PagesModule { }
