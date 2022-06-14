import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from 'src/app/class/IEvent';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Output() subEmitter : EventEmitter<boolean> = new EventEmitter()
  @Input() event! : IEvent;
  @Input() subscribed : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  saveEvent(){
    this.subEmitter.emit(this.subscribed)
  }

}
