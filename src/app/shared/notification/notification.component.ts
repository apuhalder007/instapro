import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../../service/notification.service';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private notify: NotificationService) { }
  private message:string = '';
  private messageType:string = '';
  ngOnInit() {
    // Consume message service
    this.notify.getMessage().subscribe(data=>{
      console.log(data, 'notification');
      this.message = data.message;
      this.messageType = data.type;
    });
  }

}
