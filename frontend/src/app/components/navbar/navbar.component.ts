import {Component, ElementRef, inject, ViewChild} from '@angular/core';
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
  uploadModalService: UploadModalService = inject(UploadModalService)
  userService: UserService = inject(UserService)

  @ViewChild("sidebar") sidebar!: ElementRef;

  links = [
    {name: "nav_link_home", path: ""},
    {name: "nav_link_course", path: "courses"},
    {name: "nav_link_contact", path: "contact"},
    {name: "nav_link_files", path: "files"}
  ]
  activeLink = 0

  setLinkActive(link: number) {
    this.activeLink = link
  }

  toggleUploadModal() {
    this.uploadModalService.toggleModal();
  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  toggleSidebar() {
    this.sidebar.nativeElement.classList.toggle("visible")

    const overflowValue = this.sidebar.nativeElement.classList.contains("visible") ? "hidden" : ""
    document.body.style.overflow = overflowValue
    document.documentElement.style.overflow = overflowValue

    console.log(overflowValue)
  }

  closeSidebar() {
    this.sidebar.nativeElement.classList.remove("visible")
    document.body.style.overflow = ""
    document.documentElement.style.overflow = ""
  }

  protected readonly close = close;
}
