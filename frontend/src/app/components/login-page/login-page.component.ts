import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import jwt from "jsonwebtoken"
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    LoadingSpinnerComponent
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  userService: UserService = inject(UserService)
  username: string = ""
  password: string = ""

  showOverlay: boolean = true;

  constructor(private router: Router) {}

  onSubmit(): void {
    this.userService.login(this.username, this.password).subscribe(response => {
      if ("message" in response) {
        console.error("Error occurred while trying to log in", response.message)
      } else if ("data" in response) {
        console.log(response.data.accessToken)
        const accessToken = response.data.accessToken

        // @ToDo:   vielleicht doch lieber in HttpOnly Cookie speichern?
        localStorage.setItem("accessToken", accessToken)

        // - weiterleiten auf dashboard
        this.router.navigate(['/dashboard']);
        // - login / register knöpfe ausblenden
        // - etc.

      }
    })
  }
}
