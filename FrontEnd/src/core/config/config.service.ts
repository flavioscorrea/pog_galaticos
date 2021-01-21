import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/app.api';
import { ConfigBind } from 'src/app/Shared/Models/config-bind.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(public http: HttpClient) { }

  getConfig(): Promise<ConfigBind> {
    return this.http.get<ConfigBind>(`${URL_API}/integrationcarolclockin/config`).toPromise();
  }

  update(config: ConfigBind): Promise<ConfigBind> {
    return this.http.put<ConfigBind>(`${URL_API}/integrationcarolclockin/config`, config).toPromise();
  }
}