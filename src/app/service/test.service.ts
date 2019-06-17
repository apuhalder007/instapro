import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor() { }

  add_user(userdata: any){
    console.log('This srvice method use creating user!', userdata);
  }
}
