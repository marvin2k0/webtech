import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFilePageComponent } from './view-file-page.component';

describe('ViewFilePageComponent', () => {
  let component: ViewFilePageComponent;
  let fixture: ComponentFixture<ViewFilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewFilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewFilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
