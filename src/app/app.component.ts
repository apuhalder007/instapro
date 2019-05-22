import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instaPro';

  ngOnInit() {
    const firebaseConfig = {
    apiKey: "AIzaSyBG0iuZO5YQs-DsRywRa2eHRx0hgAfX75I",
    authDomain: "instapro-4116e.firebaseapp.com",
    databaseURL: "https://instapro-4116e.firebaseio.com",
    projectId: "instapro-4116e",
    storageBucket: "instapro-4116e.appspot.com",
    messagingSenderId: "512050872976",
    appId: "1:512050872976:web:bc5d35de995f4000"
  };
  var app = firebase.initializeApp(firebaseConfig)
    
  }
}
