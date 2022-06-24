import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getAllUser(): Observable<User[]>{
    return this.http.get<User[]>('/api/user/get-all-users');
  }

  getUserById(id:any): Observable<User> {
    return this.http.post<User>(`/api/user/get-by-id/`, {"id" : id});
  }

  createUser(user: User): Observable<any> {
    return this.http.post('/api/user/create-user', user);
  }

  updateUser(user: User): Observable<any>{
    return this.http.patch('/api/user/update-user', user);
  }

  replenishment(id:any,money:any){
    return this.http.patch('/api/user/replenishment',{id:id,balance:money});
  }

  createRent(id: any, machineId:any, date:any): Observable<any> {
    return this.http.post('/api/user/create-rent', {
      "userId" : id,
      "machineId" : machineId,
      "date" : date
    });
  }

  deleteUserById(id:any) {
    return lastValueFrom(this.http.delete('/api/user/delete-user/'+id));
  }

  endRent(userId: any, machineId:any, date:any, days:any,broke:any): Observable<any> {
    return this.http.post('/api/user/end-rent', {
      "userId" : userId,
      "machineId" : machineId,
      "date" : date,
      "days": days,
      "broke": broke
    });
  }
}
