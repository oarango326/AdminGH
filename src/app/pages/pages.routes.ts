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


const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'locales', component: LocalesComponent },
            { path: 'locales/nuevo-local', component: LocalComponent },
            { path: 'locales/:id', component: InfoLocalComponent,
                children: [
                    { path: 'info-local', component: LocalComponent},
                    { path: 'mesas', component: MesasComponent},
                    { path: 'cajas', component: CajasComponent},
                    {path: '', pathMatch: 'full', redirectTo: 'info-local'},
                    {path: '**', pathMatch: 'full', redirectTo: 'info-local'}
                ]
            },
            { path: 'insumos', component: InsumosComponent },
            { path: 'proveedores', component: ProveedoresComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];
export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

