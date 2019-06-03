import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  private postID: string;
  private post: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.postID = this.route.snapshot.params.id;
    this.get_details();
  }

  get_details(){
    const rootRef = firebase.database().ref();
    const postRef = rootRef.child('/posts').child(this.postID);
    postRef.once('value', snapshot => {
      console.log(snapshot.val());
      this.post = snapshot.val();
    });
  }

}
