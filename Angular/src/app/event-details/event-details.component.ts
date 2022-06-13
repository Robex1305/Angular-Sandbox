import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IEvent } from '../class/IEvent';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event? : IEvent
  isLoaded : boolean = false;
  constructor(private route : ActivatedRoute, private eventService : EventService) { }

  ngOnInit(): void {
    this.eventService.getEvent(this.route.snapshot.params['id']).subscribe(e => {
      this.event = EventService.parse(e)
      console.log(this.event)
      this.isLoaded = true;
    })
  }

}
