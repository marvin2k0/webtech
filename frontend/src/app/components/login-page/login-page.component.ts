import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../services/user.service';
import jwt from "jsonwebtoken"

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  userService: UserService = inject(UserService)
  username: string = ""
  password: string = ""

  onSubmit(): void {
    this.userService.login(this.username, this.password).subscribe(response => {
      if ("message" in response) {
        console.error("Error occurred while trying to log in", response.message)
      } else if ("data" in response) {
        console.log(response.data.accessToken)
        const accessToken = response.data.accessToken
        localStorage.setItem("accessToken", accessToken)

        // TODO jwt speicher. mit httpOnly cookie Header aus be?
        // - weiterleiten auf dashboard
        // - login / register knöpfe ausblenden
        // - etc.
      }
    })
  }
}
