import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from 'src/app/class/IEvent';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() event! : IEvent;
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
