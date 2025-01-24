import {Component, Inject, inject} from '@angular/core';
import {PostCardComponent} from "../post-card/post-card.component";
import {ActivatedRoute} from '@angular/router';
import {CourseDetails, EMPTY_COURSE} from '../../model/course.model';
import {CourseService} from '../../services/course.service';
import {TranslatePipe} from '@ngx-translate/core';
import {InputWithIconComponent} from '../input-with-icon/input-with-icon.component';
import {JoinCourseBtnComponent} from '../join-course-btn/join-course-btn.component';
import {InteractionService} from '../../services/interaction.service';
import {CommentDetails} from '../../model/comment.model';
import {AddCommentBarComponent} from '../add-comment-bar/add-comment-bar.component';

@Component({
  selector: 'app-course-page',
  standalone: true,
  imports: [
    PostCardComponent,
    TranslatePipe,
    JoinCourseBtnComponent,
    AddCommentBarComponent,
  ],
  templateUrl: './course-page.component.html',
  styleUrl: './course-page.component.css'
})
export class CoursePageComponent {
  private courseService: CourseService = inject(CourseService)
  private interactionService: InteractionService = inject(InteractionService)
  private route: ActivatedRoute = inject(ActivatedRoute)
  courseId: string = "";
  course: CourseDetails = EMPTY_COURSE
  comments: CommentDetails[] = []

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.courseId = params["id"];

      if (this.courseId) {
        this.courseService.findCourseById(this.courseId).subscribe(response => {
          this.course = response.data
          this.interactionService.getCommentsByReferenceId(this.courseId).subscribe(commentsResponse => {
            this.comments = commentsResponse.data
          })
        })
      }
    })
  }
}
