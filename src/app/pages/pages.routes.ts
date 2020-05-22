import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LocalesComponent} from './locales/locales.component';
import {InsumosComponent} from './insumos/insumos.component';
import {ProveedoresComponent} from './proveedores/proveedores.component';
import {LocalComponent} from './components/local/local.component';
import {InfoLocalComponent} from './info-local/info-local.component';
import {MesasComponent} from './mesas/mesas.component';
import {CajasComponent} from './cajas/cajas.component';
import {AlmacenesComponent} from './almacenes/almacenes.component';
import {InsumosLocalComponent} from './insumos-local/insumos-local.component';
import {InsumoComponent} from './components/insumo/insumo.component';
import {PagenotfoundComponent} from '../shared/pagenotfound/pagenotfound.component';
import {ProveedorComponent} from './components/proveedor/proveedor.component';
import {AlmacenComponent} from './components/almacen/almacen.component';
import {ComprasComponent} from './compras/compras.component';
import {CompraComponent} from './components/compra/compra.component';


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'locales', component: LocalesComponent, data: {titulo: 'Locales'}  },
            { path: 'locales/nuevo-local', component: LocalComponent, data: {titulo: 'Locales', titulo2: 'Nuevo-Local'}  },
            { path: 'locales/:id', component: InfoLocalComponent, data: {titulo: 'Locales'},
                children: [
                    { path: 'info-local', component: LocalComponent, data: {titulo: 'Locales', titulo2: 'Informacion'}},
                    { path: 'mesas', component: MesasComponent, data: {titulo: 'Locales', titulo2: 'Mesas'}},
                    { path: 'cajas', component: CajasComponent, data: {titulo: 'Locales', titulo2: 'Cajas'}},
                    { path: 'insumos', component: InsumosLocalComponent, data: {titulo: 'Locales', titulo2: 'Insumos'}},
                    {path: '', pathMatch: 'full', redirectTo: 'info-local'},
                    {path: '**', pathMatch: 'full', redirectTo: 'info-local'}
                ]
            },
            { path: 'insumos', component: InsumosComponent, data: {titulo: 'Insumos'}  },
            { path: 'insumos/nuevo-insumo', component: InsumoComponent, data: {titulo: 'Insumos', titulo2: 'Nuevo-Insumo'}  },
            { path: 'insumos/:id/edit', component: InsumoComponent, data: {titulo: 'Insumos', titulo2: 'Editar-Insumo'}   },
            { path: 'proveedores', component: ProveedoresComponent, data: {titulo: 'Proveedores'}  },
            { path: 'proveedores/nuevo-proveedor', component: ProveedorComponent,
                data: {titulo: 'Proveedores', titulo2: 'Nuevo-Proveedor'}  },
            { path: 'proveedores/:id/edit', component: ProveedorComponent,
                data: {titulo: 'Proveedores', titulo2: 'Editar-Proveedor'}   },
            { path: 'almacenes', component: AlmacenesComponent, data: {titulo: 'Almacenes'}  },
            { path: 'almacenes/nuevo-almacen', component: AlmacenComponent,
                data: {titulo: 'Almacenes', titulo2: 'Nuevo-Almacen'}  },
            { path: 'almacenes/:id/edit', component: AlmacenComponent,
                data: {titulo: 'Insumos', titulo2: 'Editar-Almance'}   },
            // Compras
            { path: 'compras', component: ComprasComponent, data: {titulo: 'Compras'}  },
            { path: 'compras/nuevo-compra', component: CompraComponent,
                data: {titulo: 'Compras', titulo2: 'Nueva-Compra'}  },
            { path: 'compras/:id/edit', component: CompraComponent,
                data: {titulo: 'Compras', titulo2: 'Editar-Compra'}   },
            // compras
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

