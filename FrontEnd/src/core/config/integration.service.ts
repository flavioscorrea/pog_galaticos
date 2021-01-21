import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_API } from 'src/app/app.api';
import { Observable } from 'rxjs';
import { TotvsPage } from 'src/app/Shared/Models/totvspage.model';
import { Devices } from 'src/app/Shared/Models/devices.model';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {

  constructor(public http: HttpClient) { }

  getDevices(filter: string, page: number): Observable<TotvsPage<Devices>> {
    return this.http.get<TotvsPage<Devices>>(`${URL_API}/integrationcarolclockin/devices?filter=${filter}&page=${page}&pageSize=5`);
  }

}