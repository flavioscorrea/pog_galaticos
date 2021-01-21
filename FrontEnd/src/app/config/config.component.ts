import { Component, OnInit } from '@angular/core';
import { PoCheckboxGroupOption } from '@po-ui/ng-components';
import { PoMenuItem } from '@po-ui/ng-components';
import { ConfigService } from 'src/core/config/config.service';
import { ConfigBind } from '../Shared/Models/config-bind.model';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  config : ConfigBind;
  urlendpoint: string;
  pathendpoint: string;
  idacesso: string;
  domacesso: string;
  userendpoint: string;
  senhaendpoint: string;
  pathdevice: string;
  pathclockin: string;
  nomeorg: string;
  codtoken: string;
  reproc: boolean;
  properties: Array<string>;

  public readonly propertiesOptions: Array<PoCheckboxGroupOption> = [
    { value: "reproc", label: 'Reprocessar NSR' }
  ];

  constructor(
    private configService: ConfigService,
  ) { }
  
  ngOnInit() {
    this.properties = [];
    this.GetConfig();
  }

  restore(lMsg) {
    this.urlendpoint = undefined;
    this.pathendpoint = undefined;
    this.idacesso = undefined;
    this.domacesso = undefined;
    this.userendpoint = undefined;
    this.senhaendpoint = undefined;
    this.pathdevice = undefined;
    this.pathclockin = undefined;
    this.nomeorg = undefined;
    this.codtoken = undefined;
    this.properties = [];
    
  }
  
  private async GetConfig() {
  
      this.config = await this.configService.getConfig();
  
      this.urlendpoint = this.config.EndPointUrl;
      this.pathendpoint = this.config.EndPointPath;
      this.idacesso = this.config.ConnectionId;
      this.domacesso = this.config.EndPointDomainName;
      this.userendpoint = this.config.EndPointUserName;
      this.senhaendpoint = this.config.EndPointPassword;
      this.pathdevice = this.config.EndPointPathDeviceList;
      this.pathclockin = this.config.EndPointPathRecordList;
      this.nomeorg = this.config.OrganizationName;
      this.codtoken = this.config.ApiToken;
      //this.reproc = true;
  }
}
