import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesPageComponent } from './my-courses-page.component';

describe('MyCoursesPageComponent', () => {
  let component: MyCoursesPageComponent;
  let fixture: ComponentFixture<MyCoursesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyCoursesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCoursesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
