import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {ButtonComponent} from '../button/button.component';
import {NgClass} from '@angular/common';
import {UploadModalService} from '../../services/uplaod-modal.service';
import {UserService} from '../../services/user.service';
import {FileUploadComponent} from '../file-upload/file-upload.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    ButtonComponent,
    NgClass,
    FileUploadComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  router: Router = inject(Router)

  links = [
    {name: "nav_link_home", path: ""},
    {name: "nav_link_course", path: "courses"},
    {name: "nav_link_services", path: "services"},
    {name: "nav_link_contact", path: "contact"}
  ]
  activeLink = 0

  setLinkActive(link: number) {
    this.activeLink = link
  }

  constructor(private uploadModalService: UploadModalService, private userService: UserService) { }

  toggleUploadModal() {
    this.uploadModalService.toggleModal();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

}
