import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {
  private posts = [];
  private uid: any;
  private collectionPost = '/posts';
  constructor(private router: Router) { }
  ngOnInit() {
    let storageData = window.localStorage.getItem('loginUser');
    let newstorageData = JSON.parse(storageData);
    this.uid = newstorageData.uid;
    this.getposts(10);
  }

  getposts(limit){
    const dbref = firebase.database().ref(this.collectionPost);

    dbref.limitToFirst(limit).on('child_added', (snapshot)=>{
      this.posts.push({
        key: snapshot.key,
        data: snapshot.val()
      });
    })
    console.log(this.posts);
  }

  makeFavourite(postId: any) {
    console.log(postId);
    if (this.uid && this.uid !== '') {
      const dbref = firebase.database().ref('/Favourite');
      dbref.push({
        uid: this.uid,
        postId: postId
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  following(followId: any){
    if (this.uid && this.uid !== '') {
      const dbref = firebase.database().ref('/followers');
      dbref.push({
        uid: this.uid,
        followId: followId
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

}
