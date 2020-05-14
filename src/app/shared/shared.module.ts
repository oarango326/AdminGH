import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// componentes reutilizables
import {BreadcrumsComponent} from './breadcrums/breadcrums.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NorecordsComponent} from './norecords/norecords.component';
import {LoadingComponent} from './loading/loading.component';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [
       BreadcrumsComponent,
        HeaderComponent,
        SidebarComponent,
        NorecordsComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        BreadcrumsComponent,
        HeaderComponent,
        SidebarComponent,
        NorecordsComponent,
        LoadingComponent
    ]
})
export class SharedModule { }
