import { Injectable } from '@angular/core';

import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';

@Injectable({ providedIn: 'root' })
export class SampleDevices {
  getColumns(): Array<PoTableColumn> {

    return [
      { property: 'dispositivo', width: '150px' },
      { property: 'descricao', width: '150px' },
      { property: 'batidas', width: '150px' }      
    ];
  }

  getItems() {
    return [
      {
        dispositivo: '11234',
        descricao: 'teste 1',
        batidas: '10'
      },
      {
        dispositivo: '121212',
        descricao: 'teste 2',
        batidas: '10'
      },
      {
        dispositivo: '2123131',
        descricao: 'teste 3',
        batidas: '10'
      },
      {
        dispositivo: '32454',
        descricao: 'teste 4',
        batidas: '10'
      },
    ];
  }
}