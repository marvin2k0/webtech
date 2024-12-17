import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-with-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './card-with-list.component.html',
  styleUrl: './card-with-list.component.css'
})
export class CardWithListComponent {

}
