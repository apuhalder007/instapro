import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {NotificationService} from '../../service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private isLogin = false;
  constructor(private authServ: AuthService, 
              private router:Router, private notify: NotificationService) { }

  ngOnInit() {
    let storageData = window.localStorage.getItem('loginUser');
    if(storageData.length> 0){
      this.isLogin = true;
    }
    this.authServ.getUserData().subscribe(userData=>{
      console.log(userData.length, 'header data subscribe!');
      if(userData){
        this.isLogin = (userData.length > 0)? true : false;
      }else{
        this.isLogin = false;
      }
      
    });
  }

  logout(){
    this.authServ.clearUserData();
    this.router.navigate(['/auth/login']);
  }

}
