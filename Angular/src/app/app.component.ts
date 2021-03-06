import { Component, OnInit } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Angular';
  constructor(private eventService : EventService){

  }
    ngOnInit(): void {
      if(!document.cookie.includes('SameSite')){
        console.log('Adding SameSite Cookie')
        document.cookie += 'SameSite=Lax'
      }
      console.log(document.cookie)
    }
}
