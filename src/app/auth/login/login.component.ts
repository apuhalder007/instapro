import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as firebase from 'firebase';
import { stringify } from '@angular/compiler/src/util';
import {AuthService} from '../../../service/auth.service';
import {NotificationService} from '../../../service/notification.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private messageType:string;
  private message:string;
  constructor(private router: Router, private authServ : AuthService, private notify : NotificationService) { }

  ngOnInit() {
  }

  login(form: NgForm){
    const email = form.value.email;
    const pwd = form.value.pwd;
    console.log(email, pwd);
    firebase.auth().signInWithEmailAndPassword(email, pwd)
    .then(userdata=>{
      console.log(userdata.user.emailVerified);
      if(userdata.user.emailVerified == true){
        this.authServ.setUserData(userdata.user);
        this.router.navigate(['/']);
      }
      
    })
    .catch(err => {
      console.log(err);
      // Setting error message using notification service
      this.notify.setMessage('error', err.message);
    });
  }

}
