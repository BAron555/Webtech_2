import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthorizeService {

  constructor(private http: HttpClient) {}

  registerUser(username:any,password:any): Observable<User[]> {
    return this.http.post<User[]>("/api/user/create-user",
      {
        "companyname":"Nincs meg megadva",
        "companynumber": 0,
        "balance": 0,
        "taxnumber": 0,
        "headquarters":"Nincs meg megadva",
        "delegatename": username,
        "password": password
      });
  }

  async authenticateUser(username: string, password: string) {
    return this.getOneUser(username, password);
  }

  async getOneUser(username: string, password: string) {
    return lastValueFrom(
      this.http.get<User>('/api/user/login', {
        params: { delegatename: username, password: password },
      })
    );
  }
}
