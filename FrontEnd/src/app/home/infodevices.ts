import { Injectable } from '@angular/core';

import { PoTableColumn, PoTableDetail } from '@po-ui/ng-components';
import { IntegrationService } from 'src/core/config/integration.service';
import { Devices_integration } from '../Shared/Models/devices.model';

@Injectable({ providedIn: 'root' })
export class InfoDevices {
  
  constructor(
    private integrationService: IntegrationService
    
  ) { }

  getColumns(): Array<PoTableColumn> {

    return [
      { property: 'deviceCode', width: '150px' },
      { property: 'deviceDescription', width: '150px' },
      { property: 'count', width: '150px' }      
    ];
  }

  async getItems() {
    const { items, hasNext } = await this.integrationService
      .getDevices("", 1)
      .toPromise();
    return items;
  }

  async integrationItems(items: Devices_integration) {
    const { devices } = await this.integrationService
      .integrar(items)
      .toPromise();
      return devices;
  }
}