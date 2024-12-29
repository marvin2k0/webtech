import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    ButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  loggedIn: boolean = false
  router: Router = inject(Router)

  ngOnInit() {

  }

  protected readonly window = window;
}
