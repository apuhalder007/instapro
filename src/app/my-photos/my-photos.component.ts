import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { FirebaseCurdService } from '../service/firebase.curd.service';
import {NotificationService} from '../../service/notification.service';
import { NotificationComponent } from '../shared/notification/notification.component';

@Component({
  selector: 'app-my-photos',
  templateUrl: './my-photos.component.html',
  styleUrls: ['./my-photos.component.css']
})
export class MyPhotosComponent implements OnInit {
  private uid;
  private posts = [];
  private uploadedImgUrl: String = 'https://capitoltheatre.com/wp-content/uploads/2017/03/placeholder3.svg';
  private collectionPost = 'posts/';
  constructor(private curdServ : FirebaseCurdService) { }

  ngOnInit() {
    let storageData = window.localStorage.getItem('loginUser');
    let newstorageData = JSON.parse(storageData);
    this.uid = newstorageData.uid;
    this.getposts(10);
  }
  imageUpload($event){
    const file = $event.target.files[0];
    const imageName = file.name;
    const storageRef = firebase.storage().ref('/images/' + imageName);
    storageRef.put(file)
    .then( snapshot => {
      return snapshot.ref.getDownloadURL();
    })
    .then(downloadUrl=>{
      this.uploadedImgUrl = downloadUrl;
      let uid = firebase.auth().currentUser.uid;
        let payload = {
          uid: uid,
          imageUrl: this.uploadedImgUrl,
          title : imageName,
          createdAt: new Date()
        };
        var newPostKey = firebase.database().ref().child(this.collectionPost).push().key;
        const collectionUserPost = `users/posts`;
        const post = this.curdServ.add_user(this.collectionPost, newPostKey, payload);
        const UserPost = this.curdServ.add_post(uid, payload);
    })
    .catch(err=>{
      console.log(err);
    });
  }
  
  getposts(limit){
    let dbref= firebase.database().ref(this.collectionPost);

    dbref.orderByChild('uid').equalTo(this.uid).
    limitToFirst(limit).on('child_added', (snapshot)=>{
      this.posts.push({
        key: snapshot.key,
        data: snapshot.val()
      });
    })
    console.log(this.posts);
  }


}
