import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './login/register.component';
import {PagenotfoundComponent} from './shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
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
