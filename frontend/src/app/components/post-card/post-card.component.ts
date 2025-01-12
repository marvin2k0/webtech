import { Component } from '@angular/core';
import {InputWithIconComponent} from '../input-with-icon/input-with-icon.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    InputWithIconComponent
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {

}
