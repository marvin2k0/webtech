import {Component, inject} from '@angular/core';
import {UserService} from '../../services/user.service';
import {UserRole} from '../../model/user.role.model';
import {RoleSelectorComponent} from '../role-selector/role-selector.component';
import {CourseService} from '../../services/course.service';
import {CourseDetails} from '../../model/course.model';
import {RouterLink} from '@angular/router';

export interface UserDetails {
  _id: string, username: string, role: number, roleName: string, email: string, active: boolean
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    RoleSelectorComponent,
    RouterLink
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  userService: UserService = inject(UserService)
  courseService: CourseService = inject(CourseService)
  users: UserDetails[] = []
  courses: CourseDetails[] = []

  ngOnInit() {
    this.userService.getAllUsers().subscribe(response => {
      this.users = response.data
      this.users.map(usr => {
        usr.roleName = UserRole.parseEnum(usr.role).name
      })
    })

    this.courseService.findCourses("").subscribe(response => {
      this.courses = response.data
    })
  }
}
