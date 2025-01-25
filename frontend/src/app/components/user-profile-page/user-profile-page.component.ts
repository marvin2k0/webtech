import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {TranslatePipe} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';
import {ButtonComponent} from '../button/button.component';
import {CardComponent} from '../card/card.component';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {UserService} from '../../services/user.service';
import {Router, RouterLink} from '@angular/router';
import {ModalService} from '../../services/modal.service';
import {AlertBoxComponent} from '../alert-box/alert-box.component';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [
    TranslatePipe,
    FormsModule,
    ButtonComponent,
    CardComponent,
    BackgroundArtComponent,
    RouterLink,
    AlertBoxComponent
  ],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css'
})

export class UserProfilePageComponent {

  showSaveButton = false;
  showUsernameSaveButton = false;

  router: Router = inject(Router);
  userService: UserService = inject(UserService);
  modalService: ModalService = inject(ModalService);

  username: string = "";

  focusPoint: string = "";
  institute: string = "";
  dob: string = "";

  headerMessage: string = "";
  errorMessage: string = "";

  @ViewChild("usernameInput") usernameInput!: ElementRef;
  @ViewChild("focuspointInput") focuspointInput!: ElementRef;
  @ViewChild("instituteInput") instituteInput!: ElementRef;
  @ViewChild("dobInput") dobInput!: ElementRef;

  redirectUserToLogin(message: string) {
    if (message != "Username changed successfully." ) {
      return () => {};
    }
    return () => this.router.navigate(['/signin']);
  }

  onUsernameButtonClick(): void {
    if (!this.showUsernameSaveButton) {
      this.showUsernameSaveButton = true;

      return;
    }

    if (this.usernameInput.nativeElement.value === '') {
      this.headerMessage = "Error"
      this.errorMessage = "Username cannot be empty!";
      this.modalService.openModal();

      return;
    }

    this.userService.getUserInformation().subscribe(response => {
      const oldUsername: string = response.data.username;

      this.userService.postNewUsername(this.usernameInput.nativeElement.value, oldUsername).subscribe();
    })

    this.headerMessage = "Success"
    this.errorMessage = "Username changed successfully.";
    this.modalService.openModal();


    this.showUsernameSaveButton = false;
  }

  onUserInformationEditButtonClick(): void {
    if (!this.showSaveButton) {
      this.showSaveButton = true;

      return;
    }

    if (this.focuspointInput.nativeElement.value === '') {
      this.headerMessage = "Error"
      this.errorMessage = "Focus Point cannot be empty!";
      this.modalService.openModal();

      return;
    }

    this.userService.getUserInformation().subscribe(response => {
      const usernameTemp: string = response.data.username;

      const dateString = this.dobInput.nativeElement.value;
      const date = new Date(dateString);
      const unixTimestamp = Math.floor(date.getTime() / 1000);
      this.userService.postNewInformation(usernameTemp, this.focuspointInput.nativeElement.value, this.instituteInput.nativeElement.value, unixTimestamp.toString()).subscribe();
    })

    this.headerMessage = "Success"
    this.errorMessage = "User Information changed successfully.";
    this.modalService.openModal();

    this.showSaveButton = false;
  }

  ngOnInit() {
    this.userService.getUserInformation().subscribe(response => {
      const dateUnixTimeStamp = response.data.dateOfBirth;
      const date = new Date(dateUnixTimeStamp * 1000);
      const dateString = date.toISOString().split('T')[0];

      this.username = response.data.username;
      this.focusPoint = response.data.fieldOfInterests;
      this.institute = response.data.institute;
      this.dob = dateString;
    })
  }
}
