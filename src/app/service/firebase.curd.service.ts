import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class FirebaseCurdService {
  private database;
  constructor() { 
    this.database = firebase.database();
  }
  add_user(collection, id, payload){
    let user = this.database.ref(collection+'/'+id).set(payload)
    console.log(user);
  }
}
