import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CardComponent} from '../card/card.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-card-with-list',
  standalone: true,
  imports: [
    RouterLink,
    CardComponent,
    NgForOf
  ],
  templateUrl: './card-with-list.component.html',
  styleUrl: './card-with-list.component.css'
})
export class CardWithListComponent {
  @Input() objectArray: any;
  @Input() heading!: string;
  @Input() actionLink!: string;
  @Input() hdLink!: string;

}
