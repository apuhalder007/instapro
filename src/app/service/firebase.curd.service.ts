import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FirebaseCurdService {
  private database;
  private postCollection:String = '/posts/';
  constructor() { 
    this.database = firebase.database();
  }
  add_user(collection, id, payload){
    const user = this.database.ref(collection + '/' + id).set(payload)
    console.log(user);
  }
  add_post(id, payload){
    const post = this.database.ref(this.postCollection + '' + id).push(payload);
    console.log(post);
  }
}
