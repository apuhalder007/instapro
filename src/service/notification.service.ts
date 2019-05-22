import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private data : object;
  private message = new Subject<any>();
  setMessage(type, content){
    this.data = {
      message: content,
      type: type
    }
    this.message.next(this.data);
  }
  getMessage(): Observable<any>{
    return this.message.asObservable()
  }
  constructor() { }
}
