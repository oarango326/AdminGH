import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';
import {PagenotfoundComponent} from './shared/pagenotfound/pagenotfound.component';
import {PagesComponent} from './pages/pages.component';
import {DashboardComponent} from './pages/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash : true}),
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
