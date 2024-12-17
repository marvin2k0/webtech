import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardWithListComponent } from './card-with-list.component';

describe('CardWithListComponent', () => {
  let component: CardWithListComponent;
  let fixture: ComponentFixture<CardWithListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardWithListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardWithListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
