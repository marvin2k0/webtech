import {Component, inject, Input} from '@angular/core';
import {CommentDetails} from '../../model/comment.model';
import {InteractionService} from '../../services/interaction.service';

@Component({
  selector: 'comment',
  standalone: true,
  imports: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {
  @Input() comment!: CommentDetails

  interactionService: InteractionService = inject(InteractionService)
}
