import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeGetRequest = new EventEmitter();
  subRequests: Subscription;

  constructor() { }

  onSubmitRequestClick() {
    //this.invokeGetRequest.emit();
    console.log("hello");
  }



}
