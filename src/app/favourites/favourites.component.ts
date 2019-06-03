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
      const favKey = snapshot.key;
      this.rootRef.child(`posts/${postId}`).on('value', (postData)=>{
        console.log(postData.val(), postData.val().imageUrl);
        this.posts.push({
          key: postData.key,
          data: postData.val(),
          favKey: favKey
        });
      })
    })
    console.log(this.posts);
  }

  removeFavourite(postID: any){
    this.rootRef.child('Favourite').child(postID).remove()
    .then( removeFavData=>{
      console.log('This post successfully remove from favourite list!', removeFavData );
      this.getFavourites(10);
    })
    .catch(err=>{
      console.log(err);
    });
  }

}
