import { Component, ViewChild, OnInit } from '@angular/core';
import {
  PoDialogService,
  PoModalComponent,
  PoTableAction,
  PoTableColumn,
  PoTableComponent,
  PoNotificationService
} from '@po-ui/ng-components';
import { InfoDevices } from './infodevices';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent  implements OnInit {
  actions: Array<PoTableAction> = [
    {
      action: this.discount.bind(this),
      icon: 'po-icon-finance',
      label: 'Apply Discount',
      disabled: this.validateDiscount.bind(this)
    },
    { action: this.details.bind(this), icon: 'po-icon-info', label: 'Details' }
  ];
  columns: Array<PoTableColumn> = this.sampleDevices.getColumns();
  detail: any;
  items: Array<any>;
  total: number = 0;
  totalExpanded = 0;

  @ViewChild(PoModalComponent, { static: true }) poModal: PoModalComponent;
  @ViewChild(PoTableComponent, { static: true }) poTable: PoTableComponent;

  constructor(
    private sampleDevices: InfoDevices,
    private poNotification: PoNotificationService,
    private poDialog: PoDialogService,
    private router: Router
  ) {}

  
  async ngOnInit(): Promise<void> {
    this.items = await this.sampleDevices.getItems();
  }

  integrar() {

  }

  config() {
    this.router.navigate([ '/config' ])
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

  details(item) {
    this.detail = item;
    this.poModal.open();
  }

  discount(item) {
    if (!item.disableDiscount) {
      item.value = item.value - item.value * 0.2;
      item.disableDiscount = true;
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

  private getDescription(item: any) {
    return `Airfare to ${item.destination} - ${item.initials}`;
  }

  private validateDiscount(item) {
    return item.disableDiscount;
  }
}
