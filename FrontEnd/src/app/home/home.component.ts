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

export class HomeComponent implements OnInit {

  columns: Array<PoTableColumn> = this.infoDevices.getColumns();
  detail: any;
  items: Array<any> = [];
  total: number = 0;
  totalExpanded = 0;
  buttonenable = false;
  totalDevices: number;
  totalMark: number;
  hasNext: boolean;
  currentPage: number;
  filter: string;
  isHideLoading: boolean = true;
  loaderText: string = "Carregando";

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

  ngOnDestroy(): void {
    this.LoaderHide();
  }

  private async GetDash() {
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

  integrar() {
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

  async confirmItems(selectedItems: Array<any>) {
    var markings: Devices_integration = { devices: Array<device_code>() };
    selectedItems.forEach(item => {
      const selected: device_code = { deviceCode: item.deviceCode };
      markings.devices.push(selected);
    });
    this.items.forEach(item => (item.$selected = false));
    try {
      this.LoaderShow("Integrando marcações");
      const result = await this.infoDevices.integrationItems(markings);

      this.LoaderHide();
      this.showSuccessToaster("Marcações importadas com sucesso!");

      await this.GetDash();

    } catch (ex) {
      this.LoaderHide();
      this.showErrorToaster(ex.error.errorMessage);
    }

  }

  config() {
    this.router.navigate(['/config'])
  }

  async showMoreRegisters(): Promise<void> {
    await this.getNextPage();
  }

  async getNextPage(): Promise<void> {
    if (this.hasNext)
      this.currentPage++;

    await this.getAll();
  }

  async search(e: any): Promise<void> {
    await this.getAll(true);
  }

  async getAll(reset = false): Promise<void> {
    this.LoaderShow();
    if (reset)
      this.reset();

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

  private reset() {
    this.currentPage = 1;
    this.items = [];
  }
  enablebutton() {
    const selectedItems = this.poTable.getSelectedRows();
    this.buttonenable = false;
    if (selectedItems.length > 0)
      this.buttonenable = true;
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

  private LoaderShow(text: string = "Carregando") {
    this.loaderText = text;
    this.isHideLoading = false;
  }

  private LoaderHide() {
    this.loaderText = "Carregando";
    this.isHideLoading = true;
  }
}
