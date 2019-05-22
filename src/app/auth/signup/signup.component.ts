import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SingupModel } from './signup-model';
import { FirebaseCurdService } from '../../service/firebase.curd.service';
import {NotificationService} from '../../../service/notification.service';
import { NotificationComponent } from '../../shared/notification/notification.component';
import * as firebase from 'firebase';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  private signupData: SingupModel = {
    fullname:'',
    email: '',
    pwd:''
  }
  constructor(  private curdServ:FirebaseCurdService , private notify : NotificationService) { }
  private collectionName = 'users';
  private payload = {
    email: 'test1@gmail.com',
    fullname : 'apu'
  };
  ngOnInit() {
    console.log(this.curdServ);
    
  }


  signUp(form: NgForm){
    firebase.auth().createUserWithEmailAndPassword(this.signupData.email, this.signupData.pwd)
    .then( userdata => {
      firebase.auth().currentUser.sendEmailVerification()
      .then(
        (res) => {
          this.notify.setMessage('success', 'Thank you for singup with us, please check your email to verify user.');
        let uid = firebase.auth().currentUser.uid;
        let payload = {
          uid: uid,
          email: form.value.email,
          fullname : form.value.fullname
        };
        let user = this.curdServ.add_user(this.collectionName, uid, payload);
       }, 
       (error) => {
        console.log( 'Email not sent!');
        this.notify.setMessage('error', 'Email not sent!');
       });
    })
    .catch(err=>{
      this.notify.setMessage('error', err.message);
    });
  }

}
