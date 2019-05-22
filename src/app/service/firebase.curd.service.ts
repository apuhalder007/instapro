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
  add_to_collection(collection, id, payload){
    // this.database.ref(collection+'/'+id).set(payload)
    // .then(data=>{
    //   console.log(data, 'curd add');
    // })
    console.log(111);
  }
}
