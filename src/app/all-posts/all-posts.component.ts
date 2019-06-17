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
  private followings: any = [];
  private favourites: any = [];
  private rootRef = firebase.database().ref();
  private followersDetails: any = [];
  constructor(private router: Router) { }
  ngOnInit() {
    let storageData = window.localStorage.getItem('loginUser');
    let newstorageData = JSON.parse(storageData);
    this.uid = newstorageData.uid;
    this.getCurrentUserFavourites();
    this.getCurrentUserFollowings();
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

  getCurrentUserFollowings(){
    this.rootRef.child('followers').orderByChild('uid').equalTo(this.uid).
    on('child_added', (snapshot)=>{
      const followId = snapshot.val().followId;
      this.followings.push(followId);
      this.followersDetails.push({
        key: snapshot.key,
        followId: followId
      })
    });

    console.log(this.followings, 'all following user');
  }
  getCurrentUserFavourites(){
    this.rootRef.child('Favourite').orderByChild('uid').equalTo(this.uid).
    on('child_added', (snapshot)=>{
      let postId = snapshot.val().postId;
      this.favourites.push({
        key: snapshot.key,
        postId: postId
      });
      this.favourites.push(postId);
    })

    // console.log(this.favourites);
  }

  isFollowing(item: any){
    if(this.followings.indexOf(item) !== -1) {
      return true;
    } else {
    }
    return false;
  }

  isFavvourite(item: any){
    if(this.favourites.indexOf(item) !== -1) {
      // console.log('this article is fevourite');
      return true;
    } else {
      // console.log('this article is not fevourite');
    }
    return false;
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

  unfollow(userID: any ){
    const unfollowDetails =  this.followersDetails.map(follower=>{
        if(follower.followId == userID){
          return follower;
        }
    });
    console.log(unfollowDetails);
    const unfollowKey = unfollowDetails[0].key;
    console.log(unfollowKey);
    this.rootRef.child('followers').child(unfollowKey).remove()
    .then( removeFavData=>{
      console.log('unfollow user done!' );
      console.log('before splice', this.followings);
      const pos = this.followings.indexOf(userID);
      this.followings.splice(pos, 1);
      console.log('before splice', this.followings);
    })
    .catch(err=>{
      console.log(err);
    });

  } 

}
