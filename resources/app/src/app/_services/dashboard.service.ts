import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  readonly API = environment.api;

  constructor(
      private http: HttpClient
  ) { }

  getDashboard(): Observable<any>{
    return this.http.get(`${this.API}/dashboard`);
  }
}
