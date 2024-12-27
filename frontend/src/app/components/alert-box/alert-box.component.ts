import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'alert-box',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './alert-box.component.html',
  styleUrl: './alert-box.component.css'
})
export class AlertBoxComponent {
  @Input() type: "info" | "success" | "error" = "success"
}
