import { Component } from '@angular/core';
import {PostCardComponent} from '../post-card/post-card.component';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    PostCardComponent
  ],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {

}
