import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProfileEditButtonComponent } from './user-profile-edit-button.component';

describe('UserProfileEditButtonComponent', () => {
  let component: UserProfileEditButtonComponent;
  let fixture: ComponentFixture<UserProfileEditButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileEditButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileEditButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
