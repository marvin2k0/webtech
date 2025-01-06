import { Component, Input } from '@angular/core';
import {AsyncPipe, NgIf} from '@angular/common';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'alert-box',
  standalone: true,
  imports: [NgIf, FileUploadComponent, AsyncPipe],
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css'],
})
export class AlertBoxComponent {
  @Input() modalHeader: string = 'Headline';
  @Input() modalText?: string;
  @Input() confirmButtonText: string = 'Got it!';
  @Input() denyButtonText?: string;

  @Input() onConfirmCallback: () => void = () => {};
  @Input() onCancelCallback: () => void = () => {};

  @Input() canConfirm: boolean = true; // Default is true

  constructor(protected modalService: ModalService) {}

  /**
   * Executes the provided confirm callback and closes the modal.
   */
  onConfirm(): void {
    if (!this.canConfirm) return;
    this.onConfirmCallback?.();
    this.modalService.closeModal();
  }

  /**
   * Executes the provided cancel callback and closes the modal.
   */
  onDeny(): void {
    this.onCancelCallback?.();
    this.modalService.closeModal();
  }

  /**
   * Determines if the deny button should be shown.
   */
  canDeny(): boolean {
    return !!this.denyButtonText?.length;
  }

  /**
   * Closes the modal.
   */
  closeModal(): void {
    this.modalService.closeModal();
  }
}
