import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/app.api';
import { Observable } from 'rxjs';
import { TotvsPage } from 'src/app/Shared/Models/totvspage.model';
import { Devices, DevicesIntegration, TotalDevices, configured } from 'src/app/Shared/Models/devices.model';
import { IntegrationReturn } from 'src/app/Shared/Models/integration_return.model';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(public http: HttpClient) { }

  getDevices(filter: string, page: number): Observable<TotvsPage<Devices>> {
    return this.http.get<TotvsPage<Devices>>(`${URL_API}/integrationcarolclockin/devices?filter=${filter}&page=${page}&pageSize=5`);
  }

  integrar(devices: DevicesIntegration): Observable<IntegrationReturn> {
    return this.http.post<IntegrationReturn>(`${URL_API}/integrationcarolclockin/loadMarkings`, devices);
  }

  getDashBoard(): Observable<TotalDevices> {
    return this.http.get<TotalDevices>(`${URL_API}/integrationcarolclockin/devices/markings`);
  }
  getConfig(): Promise<configured> {
    return this.http.get<configured>(`${URL_API}/integrationcarolclockin/config/configured`).toPromise();
  }
}
