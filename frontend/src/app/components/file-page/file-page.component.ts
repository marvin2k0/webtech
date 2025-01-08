import { Component } from '@angular/core';
import {CardComponent} from '../card/card.component';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-file-page',
  standalone: true,
  imports: [
    CardComponent,
    ButtonComponent
  ],
  templateUrl: './file-page.component.html',
  styleUrl: './file-page.component.css'
})
export class FilePageComponent {

}
