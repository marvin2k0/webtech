import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinCourseBtnComponent } from './join-course-btn.component';

describe('JoinCourseBtnComponent', () => {
  let component: JoinCourseBtnComponent;
  let fixture: ComponentFixture<JoinCourseBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinCourseBtnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinCourseBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
