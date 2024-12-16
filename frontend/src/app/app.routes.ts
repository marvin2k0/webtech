import { Routes } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SignupPageComponent} from './components/signup-page/signup-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'signin', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'userprofile', component: UserProfilePageComponent},
  {path: '**', component: NotFoundComponent}
];
