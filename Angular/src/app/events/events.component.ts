import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { pipe } from 'rxjs';
import { IEvent } from '../class/IEvent';
import { EventService } from '../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  datePipe = new DatePipe('en-US');
  events : IEvent[] = []
  isLoaded? : boolean;
  loremIpsum : String = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget odio metus. Mauris blandit erat diam, et ultrices nulla commodo ac. Aenean eu diam sagittis, pellentesque tortor id, congue diam. Maecenas non nisi nec metus tincidunt cursus vitae id velit. Nam vel efficitur nulla, in tristique justo. Praesent vestibulum lectus sed convallis placerat. Ut a leo pharetra, consectetur lorem eu, pellentesque enim.'

  constructor(private eventService : EventService) {
   }

  ngOnInit(): void {
    this.isLoaded = false
    this.loadEvents();
  }

  loadEvents(){
    this.eventService.getEvents().subscribe((data:any[]) => {
      data.forEach(e =>{
        console.log( e.entities[0])
      this.events.push({
        'title' : e.title,
        'subtitle': e.entities[0].formatted_address,
        'body': ((<String> e.description).length > 1 ? e.description : this.loremIpsum) ,
        'footer':'Prévu le ' + this.datePipe.transform(e.start, 'dd/MM/yyyy') + ' à ' + this.datePipe.transform(e.start, 'hh:mm')
      })
    })
    this.isLoaded = true
  });
  }
}
