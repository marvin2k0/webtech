import {Component, inject, Input} from '@angular/core';
import {InteractionService} from '../../services/interaction.service';

@Component({
  selector: 'app-interactions',
  standalone: true,
  imports: [],
  templateUrl: './interactions.component.html',
  styleUrl: './interactions.component.css'
})
export class InteractionsComponent {
  @Input() referenceId!: string
  interactionService: InteractionService = inject(InteractionService)
  upvotes: number = 0
  downvotes: number = 0

  ngOnInit() {
    this.interactionService.getRating(this.referenceId).subscribe(response => {
      this.upvotes = response.data.upvotes
      this.downvotes = response.data.downvotes
    })
  }

  upvote() {
    this.interactionService.upvote(this.referenceId).subscribe(response => {
      this.upvotes = response.data.upvotes
      this.downvotes = response.data.downvotes
    })
  }

  downvote() {
    this.interactionService.downvote(this.referenceId).subscribe(response => {
      this.upvotes = response.data.upvotes
      this.downvotes = response.data.downvotes
    })
  }
}
