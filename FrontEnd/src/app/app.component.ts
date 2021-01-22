import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( private router: Router ) { }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Carga de Marca\u00e7\u00f5es', link: 'home', icon:'po-icon po-icon-clock', shortLabel:'Clock In'}
  ];

}
