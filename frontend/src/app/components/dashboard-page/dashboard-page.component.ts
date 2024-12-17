import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar.component';
import {CardWithListComponent} from '../card-with-list/card-with-list.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CardWithListComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
