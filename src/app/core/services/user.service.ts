import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getCurrentUserbalance() {
    return this._http.get<{ balance: number }>(`${environment.storeUrl}/v1/user/balance`);
  }
}
