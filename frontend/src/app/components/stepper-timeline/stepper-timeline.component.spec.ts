import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperTimelineComponent } from './stepper-timeline.component';

describe('StepperTimelineComponent', () => {
  let component: StepperTimelineComponent;
  let fixture: ComponentFixture<StepperTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepperTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
