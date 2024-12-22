import { Component } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-user-profile-edit-button',
  standalone: true,
    imports: [
        TranslatePipe
    ],
  templateUrl: './user-profile-edit-button.component.html',
  styleUrl: './user-profile-edit-button.component.css'
})
export class UserProfileEditButtonComponent {

}
