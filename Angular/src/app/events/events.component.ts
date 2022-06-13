
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, Observable } from 'rxjs';
import { IEvent } from '../class/IEvent';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  filterForm = this.formBuilder.group({
    'label' : ''
  })
  availableLabels : string[] = []
  events : IEvent[] = []
  isLoaded? : boolean;
  event? : IEvent;
  eventCount : number = 0;
  page:number = 0;
  pageCount:number[] = []
  hasMore:boolean = false;
  labels:string[] = []
  constructor(private eventService : EventService, private formBuilder : FormBuilder) {
   }


   changeLabel(event:any){
    this.filterForm.get('label')?.setValue(event.target.value)
   }

  search(){
    this.hasMore = false;
    this.page = 0
    this.eventCount = -1
    let formLabelValue = this.filterForm.get('label')
    if(formLabelValue && formLabelValue.value){
     if(formLabelValue.value.length > 1){
      this.events = []
      this.labels = formLabelValue.value.split(' ');
      this.loadEvents();
     }
   }
  }

  displayDetail(event:IEvent){
    this.event = event;
  }

  loadMore(){
    this.page += 1
    this.hasMore = false
    this.loadEvents()
  }

  ngOnInit(): void {
    this.eventCount = -1  
    console.log("loading events at page " + this.page + " width labels " + this.labels)
    this.isLoaded = false
    this.loadEvents()
    this.eventService.getLabels().subscribe(data => {
      console.log(data)
      for(let key of Object.keys(data)){
        console.log("The key value is " + key)
        this.availableLabels.push(key)
      }
    })
  }

  loadEvents() {
    this.eventService.getEvents(this.page, this.labels).subscribe((data:any[]) => {
        data.forEach(e =>{
        this.events.push(EventService.parse(e))
      })
      this.eventCount = this.eventService.eventCount;
      this.pageCount = this.eventCount < 50 ? [1] : Array.from(Array(this.eventCount/50).keys())
      console.log(this.eventCount + " events found")
      console.log(this.page + "<" + (this.pageCount.length -1) + "=" +(this.page < this.pageCount.length -1) )
      if(this.page < this.pageCount.length -1){
        this.hasMore = true;
      }
      this.isLoaded = true
      console.log("Page is loaded! (" + this.isLoaded + ")")
    });
  }
}
