import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'alert-box',
  standalone: true,
  imports: [
    NgIf
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


  /**
   * Executes the provided callback function and returns true.
   */
  onConfirm(): boolean {
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
