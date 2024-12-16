import {Component, inject} from '@angular/core';
import {ButtonComponent} from '../button/button.component';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
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
