import {Component, Input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {CardComponent} from '../card/card.component';
import {NgForOf, NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-card-with-list',
  standalone: true,
  imports: [
    RouterLink,
    CardComponent,
    NgForOf,
    NgIf,
    TranslatePipe
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
