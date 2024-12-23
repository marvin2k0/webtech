import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
    acceptTos: new FormControl(false, Validators.required)
  })

  onSubmit() {
    console.log(this.registerForm.value)
  }
}
