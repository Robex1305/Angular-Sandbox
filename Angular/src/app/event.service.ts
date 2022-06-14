import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IEvent } from './class/IEvent';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class EventService {

  // curl "https://api.predicthq.com/v1/events/?country=FR" 
  // "Accept: application/json" 
  // "Authorization: KFvQJe2IAwv6MWRxck20egGa-qYHYSAxW_b3G_SR
  // Secret 2uxVIs6CD45GDgdSkCnSrjQy4iN66Qj3CvEfKYdyme9l1lTr6smQAw
  static loremIpsum : String = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget odio metus. Mauris blandit erat diam, et ultrices nulla commodo ac. Aenean eu diam sagittis, pellentesque tortor id, congue diam. Maecenas non nisi nec metus tincidunt cursus vitae id velit. Nam vel efficitur nulla, in tristique justo. Praesent vestibulum lectus sed convallis placerat. Ut a leo pharetra, consectetur lorem eu, pellentesque enim.'
  public eventCount : number = 0;
  constructor(private http:HttpClient) { }
  header : any ={
    'Accept': 'application/json',
    'Authorization': 'Bearer KFvQJe2IAwv6MWRxck20egGa-qYHYSAxW_b3G_SR'
  }

  public getLabels() : Observable<any>{
    let url = "https://api.predicthq.com/v1/events/count/?country=FR";
    console.log(url)
      return this.http.get<any>(url, {'headers' : this.header })
      .pipe(map(o => o.labels))
    
  }

  public getEvents(page:number, labels:string[]) : Observable<any[]>{
    this.eventCount = 0
    let labelParams = ""
    if(labels[0]){
      labelParams = "&label="
      labels.forEach((v, i) => {
        if(i === 0){
          labelParams += v
        }
        else{
          labelParams += "," + v
        }
      })
    }

    let url = "https://api.predicthq.com/v1/events/?country=FR" + labelParams + "&limit=50&offset=" + (50*page);
    console.log(url)
      return this.http.get<any>(url, {'headers' : this.header })
      .pipe(
        map(o => {
        this.eventCount = o.count;
          return o.results
        }))
  }

  public getEvent(id:String) : Observable<any>{
    return this.http.get<any>("https://api.predicthq.com/v1/events/?id="+id, {'headers' : this.header })
    .pipe(
      map(o => o.results.length ? o.results[0] : null))
  }

  public static parse(e:any) : IEvent {
    let datePipe = new DatePipe('en-US');
    return {
      'id' : e.id,
      'title' : e.title,
      'subtitle': e.entities[0]?.formatted_address,
      'body': ((<String> e.description).length > 1 ? e.description : this.loremIpsum) ,
      'date':'Prévu le ' + datePipe.transform(e.start, 'dd/MM/yyyy') + ' à ' + datePipe.transform(e.start, 'hh:mm'),
      'labels': e.labels
    }
  }
} 
