import { Component } from '@angular/core';
import {CardWithListComponent} from '../card-with-list/card-with-list.component';
import {StepperTimelineComponent} from '../stepper-timeline/stepper-timeline.component';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    CardWithListComponent,
    StepperTimelineComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
