import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'input-with-icon',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './input-with-icon.component.html',
  styleUrl: './input-with-icon.component.css'
})
export class InputWithIconComponent {
  @Output() clickFunction = new EventEmitter<string>();
  text: string = "";
}
