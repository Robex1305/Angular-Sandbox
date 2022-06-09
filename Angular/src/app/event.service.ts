import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEvent } from './class/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  // curl "https://api.predicthq.com/v1/events/?country=FR" 
  // "Accept: application/json" 
  // "Authorization: KFvQJe2IAwv6MWRxck20egGa-qYHYSAxW_b3G_SR
  // Secret 2uxVIs6CD45GDgdSkCnSrjQy4iN66Qj3CvEfKYdyme9l1lTr6smQAw

  constructor(private http:HttpClient) { }

  public getEvents() : Observable<any[]>{
    
      return this.http.get<any>("https://api.predicthq.com/v1/events/?country=FR",{'headers' : {
        'Accept': 'application/json',
        'Authorization': 'Bearer KFvQJe2IAwv6MWRxck20egGa-qYHYSAxW_b3G_SR'
      }})
      .pipe(
        map(o => o.results))
  }
} 
