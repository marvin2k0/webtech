import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';
import {NgIf} from '@angular/common';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {CardComponent} from '../card/card.component';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    LoadingSpinnerComponent,
    NgIf,
    BackgroundArtComponent,
    CardComponent,
    ButtonComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  userService: UserService = inject(UserService)
  username: string = ""
  password: string = ""

  isLoading: boolean = false;

  constructor(private router: Router) { }

  onSubmit(): void {
    this.isLoading = true;

    this.userService.login(this.username, this.password).subscribe({
      next: (response) => {
        if ("message" in response) {
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
      },
    });
  }

}
