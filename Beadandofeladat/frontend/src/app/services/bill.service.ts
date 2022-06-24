import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Bill} from "../models/Bill";

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  // async postDates(id:any,start:any,end:any) {
  //   return await lastValueFrom(this.http.get<Bill[]>('/api/bill/get-filtered-bill',{params:{id,start,end}}));
  // }

  postDates(id:any,start:any,end:any) {
    return this.http.post<Bill[]>('/api/bill/get-filtered-bill',{id, start, end});
  }

}
