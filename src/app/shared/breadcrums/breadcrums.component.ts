import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.css']
})
export class BreadcrumsComponent implements OnInit {
  titulo: string;
  titulo2: string;
  titulo3: string;

  constructor(private router: Router) {
    this.router.events
        .pipe(
            filter(event => event instanceof ActivationEnd),
             filter( (event: ActivationEnd) => event.snapshot.firstChild === null),
            map((event: ActivationEnd) => event.snapshot.data )
        )
        .subscribe((resp: any) => {
          this.titulo = resp.titulo;
          this.titulo2 = resp.titulo2;
          this.titulo3 = resp.titulo3;
        });
  }
  ngOnInit(): void {
  }

}
