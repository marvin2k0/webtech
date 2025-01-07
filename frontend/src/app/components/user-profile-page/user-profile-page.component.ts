import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../button/button.component';
import {CardComponent} from '../card/card.component';
import {BackgroundArtComponent} from '../background-art/background-art.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    FormsModule,
    ButtonComponent,
    CardComponent,
    BackgroundArtComponent
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {
  showSaveButton = false;
  focusPointBool: boolean = true;
  instituteBool: boolean = true;
  dobBool: boolean = true;

  onUsernameButtonClick(): void {}

  onUserInformationEditButtonClick() {
    this.focusPointBool = !this.focusPointBool;
    this.instituteBool = !this.instituteBool;
    this.dobBool = !this.dobBool;
    this.showSaveButton = !this.showSaveButton;
  }

  ngOnInit() {

  }
}
