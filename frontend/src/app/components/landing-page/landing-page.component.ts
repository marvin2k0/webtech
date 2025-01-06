import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {AlertBoxComponent} from '../alert-box/alert-box.component';
import {NgIf} from '@angular/common';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {ButtonComponent} from '../button/button.component';
import {ModalService} from '../../services/modal.service';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import {UploadModalService} from '../../services/uplaod-modal.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    AlertBoxComponent,
    NgIf,
    FileUploadComponent,
    BackgroundArtComponent,
    ButtonComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {

  constructor(private modalService: ModalService, private uploadModalService: UploadModalService) {}

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  toggleModal() {
    this.modalService.toggleModal();
  }

  toggleUploadModal() {
    this.uploadModalService.toggleModal();
  }

  protected readonly close = close;
}
