import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../button/button.component';
import {CardComponent} from '../card/card.component';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {UserService} from '../../services/user.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    TranslatePipe,
    FormsModule,
    ButtonComponent,
    CardComponent,
    BackgroundArtComponent,
    RouterLink
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})
export class UserProfilePageComponent {
  showSaveButton = false;
  showUsernameSaveButton = false;
  focusPointBool: boolean = true;
  instituteBool: boolean = true;
  dobBool: boolean = true;

  userService: UserService = inject(UserService)

  username: string = "";

  @ViewChild("usernameInput") usernameInput!: ElementRef;

  onUsernameButtonClick(): void {
    if (!this.showUsernameSaveButton) {
      this.showUsernameSaveButton = true;

    } else {
      if (this.usernameInput.nativeElement.value === '') {
        alert("Username cannot be empty");
      } else {
        let oldUsername: string = "";

        this.userService.getUserInformation().subscribe(response => {
          oldUsername = response.data.username;

          this.userService.postNewUsername(this.usernameInput.nativeElement.value, oldUsername).subscribe();
        })

        this.showUsernameSaveButton = false;
      }
    }
  }

  onUserInformationEditButtonClick() {
    this.focusPointBool = !this.focusPointBool;
    this.instituteBool = !this.instituteBool;
    this.dobBool = !this.dobBool;
    this.showSaveButton = !this.showSaveButton;
  }

  ngOnInit() {
    this.userService.getUserInformation().subscribe(response => {
      this.username = response.data.username;
    })
  }
}
