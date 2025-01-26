import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'input-with-icon',
  standalone: true,
  imports: [
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './input-with-icon.component.html',
  styleUrl: './input-with-icon.component.css'
})
export class InputWithIconComponent {
  @Input({transform: booleanAttribute}) clearAfterSend: boolean = true
  @Input() inputPlaceholder: string = "default_input_placeholder"
  @Output() clickFunction = new EventEmitter<string>();
  text: string = "";

  onSubmit() {
    this.clickFunction.emit(this.text)

    if (this.clearAfterSend)
      this.text = "";
  }
}
