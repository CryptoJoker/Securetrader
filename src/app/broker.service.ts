import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class BrokerService {
  apiURL: string = "https://faa-crm.me";

  constructor(private http: HttpClient) {}

  
  registerLead(data) {
    const myHeaders = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    return this.http.post(`${this.apiURL}/api/leads/anonymous`, data, {headers: myHeaders});
  }

  autologin(id) {
    return this.http.get(`${this.apiURL}/api/leads/autologin/${id}`);
  }
}
