import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SingupModel } from './signup-model';
import { FirebaseCurdService } from '../../service/firebase.curd.service';
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
  constructor(  private curdServ:FirebaseCurdService) { }

  ngOnInit() {
    console.log(this.curdServ);
  }

  signUp(form: NgForm){
    firebase.auth().createUserWithEmailAndPassword(this.signupData.email, this.signupData.pwd)
    .then(userdata => {
      firebase.auth().currentUser.sendEmailVerification().then(function() {
        console.log(form.value.fullname, 'Email sent!');
        let uid = firebase.auth().currentUser.uid;
        let payload = {
          email: firebase.auth().currentUser.email,
          fullname : form.value.fullname
        };
        let collectionName = 'users';
        this.curdServ.add_to_collection(collectionName, uid, payload);

       }, function(error) {
        console.log( 'Email not sent!');
       });
    })
    .catch(err=>{
      console.log()
    });
  }

}
