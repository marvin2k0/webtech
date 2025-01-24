import {Component, inject, Input} from '@angular/core';
import {AddCommentBarComponent} from '../add-comment-bar/add-comment-bar.component';
import {CommentDetails} from '../../model/comment.model';
import {SlicePipe} from '@angular/common';
import {CommentComponent} from '../comment/comment.component';
import {InteractionService} from '../../services/interaction.service';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    AddCommentBarComponent,
    SlicePipe,
    CommentComponent
  ],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent {
  @Input() referenceId: string | undefined
  @Input() comment!: CommentDetails

  interactionService: InteractionService = inject(InteractionService)
  timestamp: string = ""
  loadReplies: boolean = false

  ngOnInit() {
    this.timestamp = this.interactionService.formatTime(this.comment)
  }

  onCommentSent(newComment: CommentDetails) {
    this.comment.replies.push(newComment)
  }
}
