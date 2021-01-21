import { Component, ViewChild, OnInit } from '@angular/core';
import {
  PoDialogService,
  PoModalComponent,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
  PoNotificationService,
  PoToasterOrientation,
  PoToasterType
} from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';
import { Devices_integration, device_code } from '../Shared/Models/devices.model';
import { InfoDevices } from './infodevices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit {
  
  columns: Array<PoTableColumn> = this.infoDevices.getColumns();
  detail: any;
  items: Array<any>;
  total: number = 0;
  totalExpanded = 0;
  

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(
    private infoDevices: InfoDevices,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.items = await this.infoDevices.getItems();
  }

  integrar() {
    const selectedItems = this.poTable.getSelectedRows();
    if (selectedItems.length > 0) {
      this.poDialog.confirm({
        title: 'Integração',
        message: `Integrar ${selectedItems.length} dispositivos?`,
        confirm: () => this.confirmItems(selectedItems),
        cancel: () => {}
      });
    }
  }

  async confirmItems(selectedItems: Array<any>) {
    var markings: Devices_integration = {devices: Array<device_code>()};
    selectedItems.forEach(item => {
      const selected: device_code = {deviceCode: item.deviceCode};
      markings.devices.push(selected);
    });
    this.items.forEach(item => (item.$selected = false));
    try {
      const result = await this.infoDevices.integrationItems(markings);
      console.log(result);
      this.showSuccessToaster("Marcações importados com sucesso!");
    } catch (error) {
      throw error;
    } 
    
  }

  config() {
    this.router.navigate([ '/config' ])
  }

  showMoreRegisters(){
    alert("xiiii")
  }

  collapseAll() {
    this.items.forEach((item, index) => {
      if (item.detail) {
        this.onCollapseDetail();
        this.poTable.collapse(index);
      }
    });
  }

  decreaseTotal(row: any) {
    if (row.value) {
      this.total -= row.value;
    }
  }

  expandAll() {
    this.totalExpanded = 0;
    this.items.forEach((item, index) => {
      if (item.detail) {
        this.onExpandDetail();
        this.poTable.expand(index);
      }
    });
  }

  onCollapseDetail() {
    this.totalExpanded -= 1;
    this.totalExpanded = this.totalExpanded < 0 ? 0 : this.totalExpanded;
  }

  onExpandDetail() {
    this.totalExpanded += 1;
  }

  sumTotal(row: any) {
    if (row.value) {
      this.total += row.value;
    }
  }

  private showSuccessToaster(message: string): void {
    this.poNotification.createToaster({
      message,
      orientation: PoToasterOrientation.Top,
      type: PoToasterType.Success,
      position: 0,
      duration: environment.toasterDuration,
    });
  }
}
