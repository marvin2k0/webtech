import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {ButtonComponent} from '../button/button.component';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    BackgroundArtComponent,
    ButtonComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  modalService: ModalService = inject(ModalService)

  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  toggleModal() {
    this.modalService.toggleModal();
  }

  protected readonly close = close;
}
