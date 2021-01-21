import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/app.api';
import { Observable } from 'rxjs';
import { TotvsPage } from 'src/app/Shared/Models/totvspage.model';
import { Devices, Devices_integration, Total_Devices } from 'src/app/Shared/Models/devices.model';
import { Integration_Return } from 'src/app/Shared/Models/integration_return.model';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(public http: HttpClient) { }

  getDevices(filter: string, page: number): Observable<TotvsPage<Devices>> {
    return this.http.get<TotvsPage<Devices>>(`${URL_API}/integrationcarolclockin/devices?filter=${filter}&page=${page}&pageSize=5`);
  }

  integrar(devices:Devices_integration): Observable<Integration_Return> {
    return this.http.post<Integration_Return>(`${URL_API}/integrationcarolclockin/loadMarkings`, devices);
  }

  getDashBoard(): Observable<Total_Devices> {
    return this.http.get<Total_Devices>(`${URL_API}/integrationcarolclockin/devices/markings`);
  }

  
}