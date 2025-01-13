import { Routes } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {SignupPageComponent} from './components/signup-page/signup-page.component';
import {UserProfilePageComponent} from './components/user-profile-page/user-profile-page.component';
import {DashboardPageComponent} from './components/dashboard-page/dashboard-page.component';
import {AuthGuard} from './guards/auth.guard'
import {CoursePageComponent} from './components/course-page/course-page.component';
import {FilePageComponent} from './components/file-page/file-page.component';
import {ViewFilePageComponent} from './components/view-file-page/view-file-page.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: 'signin', component: LoginPageComponent},
  {path: 'signup', component: SignupPageComponent},
  {path: 'courses', component: CoursePageComponent},
  {path: 'userprofile', component: UserProfilePageComponent, canActivate: [AuthGuard]},
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
  { path: 'files', component: FilePageComponent, canActivate: [AuthGuard] },
  { path: 'files/read', component: ViewFilePageComponent, canActivate: [AuthGuard] },
  {path: '**', component: NotFoundComponent}
];
