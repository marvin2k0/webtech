import {Component, inject} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {CourseDetails} from '../../model/course.model';
import {CardComponent} from '../card/card.component';
import {ButtonComponent} from '../button/button.component';
import {TranslatePipe} from '@ngx-translate/core';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    CardComponent,
    ButtonComponent,
    TranslatePipe,
    BackgroundArtComponent,
    SlicePipe,
    RouterLink
  ],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {
  courseService: CourseService = inject(CourseService)
  courses: CourseDetails[] = []

  ngOnInit() {
    this.courseService.getAllCourses().subscribe(response => {
      this.courses = response.data
    })
  }
}
