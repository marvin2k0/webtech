import { Component } from '@angular/core';
import {CardWithListComponent} from '../card-with-list/card-with-list.component';
import {StepperTimelineComponent} from '../stepper-timeline/stepper-timeline.component';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {CourseService} from '../../services/course.service';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CardWithListComponent,
    TranslatePipe
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

  courses: any[] = [];

  constructor(private userService: UserService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getEnrolledCourses();
  }

  getEnrolledCourses() {
    this.userService.getUserInformation().subscribe({
      next: (res) => {
        res.data.enrolledCourses.forEach((course: string) => { this.getCourseData(course) })
      },
      error: () => {

      }
    })
  }

  getCourseData(course: string) {
    this.courseService.findCourseById(course).subscribe({
      next: (res) => {
        this.courses.push({ title: res.data.name!, subtitle: res.data.description.slice(0, 25), linkName: "→", link: "/course/" + course })
      },
      error: () => {}
    })
  }
}
