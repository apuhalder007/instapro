import { Injectable , EventEmitter} from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userData = new Subject<any>();

  setUserData(user){
    let data = JSON.stringify(user);
    this.userData.next(data);
    window.localStorage.setItem('loginUser', data);
  }

  getUserData():Observable<any> {
    return this.userData.asObservable();
  }

  clearUserData(){
    this.userData.next('');
    window.localStorage.setItem('loginUser', '');
  }

  isLoggedIn(){
    let user = window.localStorage.getItem('loginUser');
    if(user){
      return JSON.parse(user);
    }else{
      return null;
    }
  }
  
}
