import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackgroundArtComponent } from './background-art.component';

describe('BackgroundArtComponent', () => {
  let component: BackgroundArtComponent;
  let fixture: ComponentFixture<BackgroundArtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundArtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BackgroundArtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
