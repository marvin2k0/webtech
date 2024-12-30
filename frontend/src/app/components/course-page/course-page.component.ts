import { Component } from '@angular/core';
import {PostCardComponent} from "../post-card/post-card.component";

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    PostCardComponent,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent {

}
