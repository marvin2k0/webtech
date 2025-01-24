import { Component } from '@angular/core';
import {AddCommentBarComponent} from '../add-comment-bar/add-comment-bar.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    AddCommentBarComponent
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  saveReply(commentId: string) {
    // TODO save comment to database
    console.log("This is the id of the new comment ->", commentId)
  }
}
