import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  private uid: any;
  private rootRef: any = firebase.database().ref();
  private users: any = [];
  constructor() {
  }

  ngOnInit() {
    const storageData = window.localStorage.getItem('loginUser');
    const newstorageData = JSON.parse(storageData);
    this.uid = newstorageData.uid;
    this.getFollowings(10);
  }

  getFollowings(limit){

    this.rootRef.child('followers').orderByChild('uid').equalTo(this.uid).
    limitToFirst(limit).on('child_added', (snapshot)=>{
      console.log(snapshot.val());
      this.rootRef.child('users').orderByChild('uid').equalTo(snapshot.val().followId).on('child_added', (userData)=>{
        console.log(userData);
        this.users.push({
          key: userData.key,
          data: userData.val()
        });
      })
    })
  }

}
