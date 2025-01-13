import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUploadedFilesPageComponent } from './my-uploaded-files-page.component';

describe('MyUploadedFilesPageComponent', () => {
  let component: MyUploadedFilesPageComponent;
  let fixture: ComponentFixture<MyUploadedFilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUploadedFilesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUploadedFilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
