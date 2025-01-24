import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../button/button.component';
import {CardComponent} from '../card/card.component';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {UserService} from '../../services/user.service';
import {RouterLink} from '@angular/router';
import {CachingService} from '../../services/caching.service';

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

  userService: UserService = inject(UserService)
  cachingService: CachingService = inject(CachingService)

  username: string = "";

  focusPoint: string = "";
  institute: string = "";
  dob: number = -1;

  @ViewChild("usernameInput") usernameInput!: ElementRef;
  @ViewChild("focuspointInput") focuspointInput!: ElementRef;
  @ViewChild("instituteInput") instituteInput!: ElementRef;
  @ViewChild("dobInput") dobInput!: ElementRef;

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

          this.cachingService.invalidateAll();

          this.userService.postNewUsername(this.usernameInput.nativeElement.value, oldUsername).subscribe();
        })

        alert("Username changed successfully");

        this.showUsernameSaveButton = false;
      }
    }
  }

  onUserInformationEditButtonClick() {
    if (!this.showSaveButton) {
      this.showSaveButton = true;
    } else {
      if (this.focuspointInput.nativeElement.value === '') {
        alert("Focus Point cannot be empty!");
      } else {
        let usernameTemp: string = "";

        this.userService.getUserInformation().subscribe(response => {
          usernameTemp = response.data.username;

          this.cachingService.invalidateAll();

          this.userService.postNewInformation(usernameTemp, this.focuspointInput.nativeElement.value, this.instituteInput.nativeElement.value, this.dobInput.nativeElement.value).subscribe();
        })

        alert("User Information changed successfully");

        this.showSaveButton = false;
      }
    }
  }

  ngOnInit() {
    this.userService.getUserInformation().subscribe(response => {
      this.username = response.data.username;
      this.focusPoint = response.data.fieldOfInterests;
      this.institute = response.data.institute;
      this.dob = response.data.dateOfBirth;
    })
  }
}
