import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import {FileUploadComponent} from '../file-upload/file-upload.component';

@Component({
  selector: 'alert-box',
  standalone: true,
  imports: [
    NgIf,
    FileUploadComponent
  ],
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css']
})
export class AlertBoxComponent {
  @Input() modalHeader: string = "Headline";
  @Input() modalText: string | undefined;
  @Input() confirmButtonText: string = "Got it!";
  @Input() denyButtonText: string | undefined;

  @Input() onConfirmCallback: () => void = () => {};
  @Input() onCancelCallback: () => void = () => {};

  @Input() uploadAreaShown: boolean = false
  @Input() currentUploadSite: number = 1;
  @Input() canConfirm: boolean = true; // Default is true


  /**
   * Executes the provided callback function and returns true.
   */
  onConfirm(): boolean {
    if (!this.canConfirm) return false;
    if (this.onConfirmCallback) {
      this.onConfirmCallback();
    }
    return true;
  }

  /**
   * Always returns false. Executes the provided callback fn.
   */
  onDeny(): boolean {

    if (this.onCancelCallback) {
      this.onCancelCallback();
    }

    return false;
  }

  canDeny(): boolean {
    return typeof this.denyButtonText !== "undefined" && this.denyButtonText.length > 0;
  }
}
