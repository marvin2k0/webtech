import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {ButtonComponent} from "../button/button.component";
import {TranslatePipe} from "@ngx-translate/core";
import {UserService} from '../../services/user.service';
import {CourseDetails, EMPTY_COURSE} from '../../model/course.model';
import {CourseService} from '../../services/course.service';
import {Router} from '@angular/router';

@Component({
  selector: 'join-course-btn',
  standalone: true,
  imports: [
    ButtonComponent,
    TranslatePipe
  ],
  templateUrl: './join-course-btn.component.html',
  styleUrl: './join-course-btn.component.css'
})
export class JoinCourseBtnComponent {
  @Input() course: CourseDetails = EMPTY_COURSE
  @Output() refreshCourses: EventEmitter<boolean> = new EventEmitter()
  userService: UserService = inject(UserService)
  courseService: CourseService = inject(CourseService)
  router: Router = inject(Router)
  ownId: string = ""

  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      return;

    this.userService.getUserInformation().subscribe(response => {
      this.ownId = response.data._id
    })
  }

  joinCourse(id: string) {
    this.courseService.joinCourse(id).subscribe(response => {
      this.refreshCourses.emit(true)
    })
  }
}
