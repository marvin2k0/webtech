import { Routes } from '@angular/router';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const routes: Routes = [
  {path: '', component: LandingPageComponent},
  {path: '**', component: NotFoundComponent}
];
