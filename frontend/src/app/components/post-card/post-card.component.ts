import {Component, inject, Input} from '@angular/core';
import {AddCommentBarComponent} from '../add-comment-bar/add-comment-bar.component';
import {CommentDetails} from '../../model/comment.model';
import {SlicePipe, TitleCasePipe} from '@angular/common';
import {CommentComponent} from '../comment/comment.component';
import {InteractionService} from '../../services/interaction.service';
import {TranslatePipe} from '@ngx-translate/core';
import {InteractionsComponent} from '../interactions/interactions.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [
    AddCommentBarComponent,
    SlicePipe,
    CommentComponent,
    TitleCasePipe,
    TranslatePipe,
    InteractionsComponent
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
