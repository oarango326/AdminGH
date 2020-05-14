import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import {PagesModule} from './pages/pages.module';
import {APP_ROUTES} from './app.routes';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
