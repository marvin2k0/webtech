import {Component, inject} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {CourseDetails} from '../../model/course.model';
import {CardComponent} from '../card/card.component';
import {ButtonComponent} from '../button/button.component';
import {TranslatePipe} from '@ngx-translate/core';
import {BackgroundArtComponent} from '../background-art/background-art.component';
import {SlicePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {InputWithIconComponent} from '../input-with-icon/input-with-icon.component';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-courses-page',
  standalone: true,
  imports: [
    CardComponent,
    ButtonComponent,
    TranslatePipe,
    BackgroundArtComponent,
    SlicePipe,
    RouterLink,
    InputWithIconComponent
  ],
  templateUrl: './courses-page.component.html',
  styleUrl: './courses-page.component.css'
})
export class CoursesPageComponent {
  userService: UserService = inject(UserService)
  courseService: CourseService = inject(CourseService)
  courses: CourseDetails[] = []
  ownId: string = ""

  ngOnInit() {
    this.searchAndLoadCourses("")
    this.userService.getUserInformation().subscribe(response => {
      this.ownId = response.data._id
    })
  }

  searchAndLoadCourses(query: string) {
    this.courseService.findCourses(query).subscribe(response => {
      this.courses = response.data
    })
  }

  joinCourse(id: string) {
    this.courseService.joinCourse(id).subscribe(response => {
      this.searchAndLoadCourses("")
    })
  }
}
