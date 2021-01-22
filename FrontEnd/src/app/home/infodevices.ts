import { Injectable } from '@angular/core';

import { PoTableColumn } from '@po-ui/ng-components';
import { IntegrationService } from 'src/core/config/integration.service';
import { Devices, DevicesIntegration, TotalDevices } from '../Shared/Models/devices.model';
import { IntegrationReturnItem } from '../Shared/Models/integration_return.model';
import { TotvsPage } from '../Shared/Models/totvspage.model';

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

  async getItems(filter: string, currentPage: number): Promise<TotvsPage<Devices>> {
    const devices: TotvsPage<Devices> = await this.integrationService
      .getDevices(filter, currentPage)
      .toPromise();
    return devices;
  }

  async integrationItems(items: DevicesIntegration): Promise<Array<IntegrationReturnItem>> {
    const { devices } = await this.integrationService
      .integrar(items)
      .toPromise();
    return devices;
  }

  async getDashboard(): Promise<TotalDevices> {
    const result = await this.integrationService
      .getDashBoard()
      .toPromise();
    return result;
  }

  async getConfig() {
    var result = await this.integrationService
      .getConfig();
      return result;
  }
}
