import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  private posts: any = [];
  private uid: any;
  private rootRef = firebase.database().ref();
  constructor() { }

  ngOnInit() {
    let storageData = window.localStorage.getItem('loginUser');
    let newstorageData = JSON.parse(storageData);
    this.uid = newstorageData.uid;
    this.getFavourites(10);
  }

  getFavourites(limit){
    this.rootRef.child('Favourite').orderByChild('uid').equalTo(this.uid).
    limitToFirst(limit).on('child_added', (snapshot)=>{
      let postId = snapshot.val().postId;
      this.rootRef.child(`posts/${postId}`).once('value', (postData)=>{
        console.log(postData.val(), postData.val().imageUrl);
        this.posts.push({
          key: postData.key,
          data: postData.val()
        });
      })
    })
    console.log(this.posts);
  }

}
