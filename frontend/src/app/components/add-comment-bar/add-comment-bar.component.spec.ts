import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentBarComponent } from './add-comment-bar.component';

describe('AddCommentBarComponent', () => {
  let component: AddCommentBarComponent;
  let fixture: ComponentFixture<AddCommentBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCommentBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommentBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
