import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {AlertBoxComponent} from '../alert-box/alert-box.component';
import {NgIf} from '@angular/common';
import {LoadingSpinnerComponent} from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    AlertBoxComponent,
    NgIf,
    LoadingSpinnerComponent,
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  private userService: UserService = inject(UserService)
  private router: Router = inject(Router)
  successful = true
  errorMessage = ""
  modalShown: boolean = false;
  isLoading: boolean = false;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    passwordConfirm: new FormControl('', Validators.required),
    acceptTos: new FormControl(false, Validators.required)
  })

  handleConfirm = () => {
    this.toggleModal();
  };

  toggleModal = () => this.modalShown = !this.modalShown;

  onSubmit() {
    const {username, email, password, passwordConfirm} = this.registerForm.value

    if (password !== passwordConfirm) {
      this.successful = false
      this.toggleModal();
      this.errorMessage = "Passwords must match!"
      return ;
    }

    this.isLoading = true;
    this.userService.register(username!, email!, password!).subscribe(response => {

      if (response.successful) {
        this.router.navigateByUrl("/signin")
          .then(() => console.log("Successfully registered"))
      } else {
        this.successful = false
        this.toggleModal();
        this.errorMessage = response.message
      }

      // TODO @Deans coole ladeanimation einfügen, wenn sie fertig ist
      this.isLoading = false;
    })

  }
}
