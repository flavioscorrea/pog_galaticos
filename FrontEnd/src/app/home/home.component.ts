import { Component, ViewChild, OnInit } from '@angular/core';
import {
  PoDialogService,
  PoModalComponent,
  PoTableColumn,
  PoTableComponent,
  PoNotificationService,
  PoToasterOrientation,
  PoToasterType
} from '@po-ui/ng-components';
import { environment } from 'src/environments/environment';
import { DevicesIntegration, DeviceCode } from '../Shared/Models/devices.model';
import { InfoDevices } from './infodevices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  columns: Array<PoTableColumn> = this.infoDevices.getColumns();
  detail: any;
  items: Array<any> = [];
  total = 0;
  totalExpanded = 0;
  buttonenable = false;
  totalDevices = 0;
  totalMark = 0;
  hasNext = false;
  currentPage = 1;
  filter = '';
  isHideLoading = true;
  loaderText = 'Carregando';

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(
    private infoDevices: InfoDevices,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {

    this.setInitialCurrentPage();
    await this.GetDash();
  }

  private async GetDash(): Promise<void> {
    this.LoaderShow();
    try {
      const dash = await this.infoDevices.getDashboard();
      this.LoaderHide();
      this.reset();
      this.totalDevices = dash.totalDevices;
      this.totalMark = dash.total;
      this.items = dash.items;
      this.hasNext = dash.hasNext;

    } catch (ex) {
      this.LoaderHide();
      this.showErrorToaster(ex.error.errorMessage);
    }

  }

  setInitialCurrentPage(): void {
    this.currentPage = 1;
    this.filter = '';
  }

  integrar(): void {
    const selectedItems = this.poTable.getSelectedRows();
    if (selectedItems.length > 0) {
      this.poDialog.confirm({
        title: 'Integração',
        message: `Integrar ${selectedItems.length} dispositivos?`,
        confirm: () => this.confirmItems(selectedItems),
        cancel: () => { }
      });
    }
  }

  async confirmItems(selectedItems: Array<DeviceCode>): Promise<void> {
    const markings: DevicesIntegration = { devices: Array<DeviceCode>() };
    selectedItems.forEach(item => {
      const selected: DeviceCode = { deviceCode: item.deviceCode };
      markings.devices.push(selected);
    });
    this.items.forEach(item => (item.$selected = false));
    try {
      this.LoaderShow('Integrando marcações');
      const result = await this.infoDevices.integrationItems(markings);

      this.LoaderHide();
      this.showSuccessToaster('Marcações importadas com sucesso!');

      await this.GetDash();

    } catch (ex) {
      this.LoaderHide();
      this.showErrorToaster(ex.error.errorMessage);
    }

  }

  config(): void {
    this.router.navigate(['/config']);
  }

  async showMoreRegisters(): Promise<void> {
    await this.getNextPage();
  }

  async getNextPage(): Promise<void> {
    if (this.hasNext) {
      this.currentPage++;
    }
    await this.getAll();
  }

  async search(e: any): Promise<void> {
    await this.getAll(true);
  }

  async getAll(reset = false): Promise<void> {
    this.LoaderShow();
    if (reset) {
      this.reset();
    }

    try {
      const { items, hasNext } = await this.infoDevices.getItems(this.filter, this.currentPage);
      this.items = this.items.concat(items);
      this.hasNext = hasNext;
      this.LoaderHide();
    } catch (ex) {
      this.LoaderHide();
      this.showErrorToaster(ex.error.errorMessage);
    }
  }

  private reset(): void {
    this.currentPage = 1;
    this.items = [];
  }
  enablebutton(): void {
    const selectedItems = this.poTable.getSelectedRows();
    this.buttonenable = false;
    if (selectedItems.length > 0) {
      this.buttonenable = true;
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

  private showErrorToaster(message: string): void {
    this.poNotification.createToaster({
      message,
      orientation: PoToasterOrientation.Bottom,
      type: PoToasterType.Error,
      position: 0,
      duration: environment.toasterDuration,
    });
  }

  private LoaderShow(text: string = 'Carregando'): void {
    this.loaderText = text;
    this.isHideLoading = false;
  }

  private LoaderHide(): void {
    this.loaderText = 'Carregando';
    this.isHideLoading = true;
  }
}
