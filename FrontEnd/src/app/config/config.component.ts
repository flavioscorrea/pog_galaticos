import { Component, OnInit } from '@angular/core';
import { 
  PoCheckboxGroupOption,
  PoNotificationService,
  PoToasterOrientation,
  PoToasterType } from '@po-ui/ng-components';
import { ConfigService } from 'src/core/config/config.service';
import { environment } from 'src/environments/environment';
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
  reproc: Array<string>;


  public readonly reprocOptions: Array<PoCheckboxGroupOption> = [
    { label: 'Reprocessar NSR',value: "reproc" }
  ];
  
  constructor(
    private configService: ConfigService,
    private notification: PoNotificationService
  ) { }
  
  ngOnInit() {
    this.GetConfig();
  }

  public async Update() {
    this.config.EndPointUrl = this.urlendpoint;
    this.config.EndPointPath = this.pathendpoint
    this.config.ConnectionId = this.idacesso;
    this.config.EndPointDomainName = this.domacesso;
    this.config.EndPointUserName = this.userendpoint; 
    this.config.EndPointPassword = this.senhaendpoint;
    this.config.EndPointPathDeviceList = this.pathdevice;
    this.config.EndPointPathRecordList = this.pathclockin;
    this.config.OrganizationName = this.nomeorg;
    this.config.ApiToken = this.codtoken;
    this.config.reprocessNSR = false;
    if (this.reproc[0] == "reproc" )
      this.config.reprocessNSR = true;
     
     await this.configService.update(this.config);
     this.showSuccessToaster("Configurações salvas com sucesso!");
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
      this.reproc = [];
      if (this.config.reprocessNSR)
        this.reproc = ['reproc'];
      
  }

  private showSuccessToaster(message: string): void {
    this.notification.createToaster({
      message,
      orientation: PoToasterOrientation.Top,
      type: PoToasterType.Success,
      position: 0,
      duration: environment.toasterDuration,
    });
  }
}
