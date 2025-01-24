import {Component, EventEmitter, inject, Output} from '@angular/core';
import {InputWithIconComponent} from "../input-with-icon/input-with-icon.component";
import {UserService} from '../../services/user.service';
import {InteractionService} from '../../services/interaction.service';

@Component({
  selector: 'add-comment-bar',
  standalone: true,
  imports: [
    InputWithIconComponent
  ],
  templateUrl: './add-comment-bar.component.html',
  styleUrl: './add-comment-bar.component.css'
})
export class AddCommentBarComponent {
  @Output() saveComment: EventEmitter<string> = new EventEmitter()

  userService: UserService = inject(UserService)
  interactionService: InteractionService = inject(InteractionService)
  userId: string | undefined;

  ngOnInit(): void {
    if (!this.userService.isLoggedIn())
      return;

    this.userService.getUserInformation().subscribe(response => {
      this.userId = response.data._id
    })
  }

  addComment(text: string) {
    if (!this.userId)
      return;

    this.interactionService.saveComment(text).subscribe(response => {
      this.saveComment.emit(response.data)
    })
  }
}
