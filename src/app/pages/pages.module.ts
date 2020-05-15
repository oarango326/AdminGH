import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// componentes
import {PagesComponent} from './pages.component';

// paginas
import {DashboardComponent} from './dashboard/dashboard.component';
import {LocalesComponent} from './locales/locales.component';

// rutas
import {PAGES_ROUTES} from './pages.routes';

// modulo Secundario
import {SharedModule} from '../shared/shared.module';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { InsumosComponent } from './insumos/insumos.component';

// servicios
import {LocalesService} from '../services/locales/locales.service';
import { LocalComponent } from './components/local/local.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { InfoLocalComponent } from './info-local/info-local.component';
import { MesasComponent } from './mesas/mesas.component';
import { CajasComponent } from './cajas/cajas.component';

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
    CajasComponent
  ],
  exports: [
    PagesComponent,
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
        FormsModule
    ],
  providers: [
  ],
})
export class PagesModule { }
