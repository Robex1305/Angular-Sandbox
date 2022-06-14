
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
  subscribedEvents : IEvent[] = []
  
  isLoaded? : boolean;
  event? : IEvent;
  eventCount : number = 0;
  page:number = 0;
  pageCount:number[] = []
  hasMore:boolean = false;
  labels:string[] = []
  subFilterEnabled: boolean = false;
  constructor(private eventService : EventService, private formBuilder : FormBuilder) {
   }

   isSubbed(event:IEvent) : boolean{
      let subbed = false;
      this.subscribedEvents.forEach(e => {
        if(e.id === event.id){
          subbed = true;
        }
      })
      return subbed;
   }



   subFilter(event:IEvent){
    if(!this.subFilterEnabled){
      return true;
    }

    if(this.isSubbed(event)){
      return true;
    }

    return false
   }

   hasSubbed(subbed: boolean, selectedEvent:IEvent){
    if(!subbed){
      this.subscribedEvents.push(selectedEvent)
      console.log("Pushing event " + selectedEvent.id)
    }
    else{
      console.log("Removing event " + selectedEvent.id)
      let toDelete = -1;
      this.subscribedEvents.forEach((v,i)=>{
        if(v.id===selectedEvent.id){
          toDelete = i
        }
      })
      
      if(toDelete  != -1){
        this.subscribedEvents.splice(toDelete, 1);
      }
    }
    localStorage.setItem("subbed", JSON.stringify(this.subscribedEvents))
    
   }

   changeLabel(event:any){
    this.filterForm.get('label')?.setValue(event.target.value)
   }

  search(){
    this.hasMore = false;
    this.page = 0
    this.eventCount = -1
    let formLabelValue = this.filterForm.get('label')
    if(formLabelValue?.value){
      this.labels = [formLabelValue.value.split(' ')[1]]
      console.log("label: " +  [formLabelValue.value.split(' ')[1]])
   }
   else {
    this.labels = []
   }
   this.events = []
    this.loadEvents();
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
    this.subscribedEvents = localStorage.getItem("subbed") ? JSON.parse(<string> localStorage.getItem("subbed")) : []
    this.eventCount = -1  
    console.log("loading events at page " + this.page + " width labels " + this.labels)
    this.isLoaded = false
    this.loadEvents()
    this.eventService.getLabels().subscribe(data => {
      console.log(data)
      this.availableLabels.push('')
      for(let key of Object.keys(data)){
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
      this.pageCount = this.eventCount < 50 ? [0] : Array.from(Array(Math.round(this.eventCount/50)).keys())
      
      if(this.page < this.pageCount.length -1){
        this.hasMore = true;
      }
      this.isLoaded = true
    });
  }
}
