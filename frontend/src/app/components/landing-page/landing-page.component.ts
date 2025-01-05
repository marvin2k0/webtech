import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {AlertBoxComponent} from '../alert-box/alert-box.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    AlertBoxComponent,
    NgIf
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  modalShown: boolean = true;
  currentSite = 1;

  toggleModal () {
    this.modalShown = !this.modalShown;
  }

  handleConfirm = () => {
    this.currentSite += 1;

  }

  handleDeny = () => {
    this.toggleModal();
  }

  protected readonly document = document;

  canConfirm(): boolean {

    // @ts-ignore
    const hasFiles = document.getElementById('file-details')?.children.length > 0;

    console.log("hasFiles", hasFiles);

    switch (this.currentSite) {
      case 1:
        return hasFiles;
      case 2:
      case 3:
      default:
        return true;
    }
  }
}
