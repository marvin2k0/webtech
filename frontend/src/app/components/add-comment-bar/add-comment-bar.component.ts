import {Component, inject, Input} from '@angular/core';
import {InputWithIconComponent} from "../input-with-icon/input-with-icon.component";
import {UserService} from '../../services/user.service';
import {InteractionService} from '../../services/interaction.service';
import {CachingService} from '../../services/caching.service';

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
  @Input() referenceId: string | undefined;

  userService: UserService = inject(UserService)
  cachingService: CachingService = inject(CachingService)
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
    if (!this.userId || !this.referenceId) {
      console.log(this.referenceId)
      return;
    }

    this.interactionService.saveComment(this.referenceId, text).subscribe(response => {
      console.log(this.referenceId)
      this.cachingService.invalidateAll()
    })
  }
}
