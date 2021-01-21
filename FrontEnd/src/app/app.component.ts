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
    { label: 'Início', link: 'home' }, { label: 'Configura\u00e7\u00e3o', link: 'config' }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

  ngOnInit() {
    //this.restore();
  }

  restore() {
      //alert('S� Jesus salva!!!');
     // this.router.navigate([ '/config' ])
  }

}
