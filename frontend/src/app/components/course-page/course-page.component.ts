import {Component, inject} from '@angular/core';
import {PostCardComponent} from "../post-card/post-card.component";
import {ActivatedRoute} from '@angular/router';
import {CourseDetails, EMPTY_COURSE} from '../../model/course.model';
import {CourseService} from '../../services/course.service';
import {TranslatePipe} from '@ngx-translate/core';
import {InputWithIconComponent} from '../input-with-icon/input-with-icon.component';
import {JoinCourseBtnComponent} from '../join-course-btn/join-course-btn.component';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    PostCardComponent,
    TranslatePipe,
    InputWithIconComponent,
    JoinCourseBtnComponent,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent {
  private courseService: CourseService = inject(CourseService)
  private route: ActivatedRoute = inject(ActivatedRoute)
  private courseId: string = "";
  course: CourseDetails = EMPTY_COURSE

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params["id"];

      if (this.courseId) {
        this.courseService.findCourseById(this.courseId).subscribe(response => this.course = response.data)
      }
    })
  }
}
