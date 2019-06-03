
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowersComponent } from './followers/followers.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { MyPhotosComponent } from './my-photos/my-photos.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { SinglePostComponent } from './single-post/single-post.component';
const routes: Routes = [
  {
    path:'', component: AllPostsComponent,
  },
  {
    path: 'followers', component: FollowersComponent, canActivate:[AuthGuard]
  },
  {
    path: 'favourites', component: FavouritesComponent, canActivate:[AuthGuard]
  },
  {
    path: 'my-photos', component: MyPhotosComponent, canActivate:[AuthGuard]
  },
  {
    path: 'auth/login', component: LoginComponent,
  },
  {
    path: 'auth/signup', component: SignupComponent,
  },
  {
    path: ':id', component: SinglePostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
