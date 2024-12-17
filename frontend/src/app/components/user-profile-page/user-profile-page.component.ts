import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {

}
