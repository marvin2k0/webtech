import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';
import {NgIf} from '@angular/common';
import {AlertBoxComponent} from '../alert-box/alert-box.component';
import {ButtonComponent} from '../button/button.component';
import {CardComponent} from '../card/card.component';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    LoadingSpinnerComponent,
    NgIf,
    ButtonComponent,
    CardComponent,
    BackgroundArtComponent,
    AlertBoxComponent,
    TranslatePipe
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  // @ToDo:   We should consider using some sort of form validator here as well,
  //          just to ensure less bakcned workload and a consistently good UX

  userService: UserService = inject(UserService)
  username: string = ""
  password: string = ""

  isLoading: boolean = false;
  modalShown: boolean = false;
  errorMessage: string = "";

  handleConfirm = () => {
    this.modalShown = false;
  }

  constructor(private router: Router) { }

  onSubmit(): void {
    this.isLoading = true;

    this.userService.login(this.username, this.password).subscribe({
      next: (response) => {
        if ("message" in response) {
          this.modalShown = true;
          this.errorMessage = response.message;
          console.error("Error occurred while trying to log in", response.message);

        } else if ("data" in response) {
          console.log(response.data.accessToken);
          const accessToken = response.data.accessToken;

          // @ToDo:   We might want to use HttpOnly cookies instead of localStorage
          localStorage.setItem("accessToken", accessToken);
          this.router.navigate(['/dashboard']);

          // Buttons ausblenden etc....
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Login request failed", err);
        this.isLoading = false;
        this.modalShown = true;

        let errorMessage: string = "";
        if (err.message.includes("401")) {
          errorMessage = "Invalid credentials";
        }
        this.errorMessage = errorMessage;
      },
    });
  }

}
