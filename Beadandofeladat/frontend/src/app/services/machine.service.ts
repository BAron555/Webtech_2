import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {Machine} from "../models/Machine";

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  constructor(private http: HttpClient) { }

  getallMachine(): Observable<Machine[]>{
    return this.http.get<Machine[]>('/api/machine/get-all-machine');
  }

  createMachine(user: Machine): Observable<any> {
    return this.http.post('/api/machine/create-machine', user);
  }

  deleteMachineById(id:any) {
    return lastValueFrom(this.http.delete('/api/machine/delete-by-id/'+id));
  }

}
