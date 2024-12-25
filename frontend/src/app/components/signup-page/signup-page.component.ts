import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AlertBoxComponent} from '../alert-box/alert-box.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    AlertBoxComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  private userService: UserService = inject(UserService)
  private router: Router = inject(Router)
  successful = true
  errorMessage = ""

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
    acceptTos: new FormControl(false, Validators.required)
  })

  onSubmit() {
    const {username, email, password, passwordConfirm} = this.registerForm.value

    // TODO replace alert with better error message
    if (password !== passwordConfirm) {
      alert("Passwords must match!")
      return
    }

    this.userService.register(username!, email!, password!).subscribe(response => {
      if (response.successful) {
        this.router.navigateByUrl("/signin")
          .then(() => console.log("Successfully registered"))
      } else {
        this.successful = false
        this.errorMessage = response.message
      }

      // TODO @Deans coole ladeanimation einfügen, wenn sie fertig ist
    })
  }
}
