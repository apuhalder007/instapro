import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// import { AngularFireModule } from "@angular/fire";
// import { AngularFireAuthModule } from "@angular/fire/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBG0iuZO5YQs-DsRywRa2eHRx0hgAfX75I",
//   authDomain: "instapro-4116e.firebaseapp.com",
//   databaseURL: "https://instapro-4116e.firebaseio.com",
//   projectId: "instapro-4116e",
//   storageBucket: "instapro-4116e.appspot.com",
//   messagingSenderId: "512050872976",
//   appId: "1:512050872976:web:bc5d35de995f4000"
// };

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowersComponent } from './followers/followers.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NotificationComponent } from './shared/notification/notification.component';
import { SinglePostComponent } from './single-post/single-post.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllPostsComponent,
    FollowersComponent,
    FavouritesComponent,
    MyPhotosComponent,
    LoginComponent,
    SignupComponent,
    NotificationComponent,
    SinglePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
