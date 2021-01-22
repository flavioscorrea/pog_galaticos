import { Injectable } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';
import { IntegrationService } from 'src/core/config/integration.service';
import { DevicesIntegration } from '../Shared/Models/devices.model';

@Injectable({ providedIn: 'root' })
export class InfoDevices {

  constructor(
    private integrationService: IntegrationService

  ) { }

  getColumns(): Array<PoTableColumn> {

    return [
      { property: 'deviceCode', label: 'Código', width: '200px' },
      { property: 'deviceDescription', label: 'Descrição', width: '200px' },
      { property: 'count', label: 'Marcações pendentes', width: '200px' }
    ];
  }

  async getItems(filter: string, currentPage: number) {
    const { items, hasNext } = await this.integrationService
      .getDevices(filter, currentPage)
      .toPromise();
    return { items, hasNext };
  }

  async integrationItems(items: DevicesIntegration) {
    const { devices } = await this.integrationService
      .integrar(items)
      .toPromise();
    return devices;
  }

  async getDashboard() {
    const result = await this.integrationService
      .getDashBoard()
      .toPromise();
    return result;
  }
}
