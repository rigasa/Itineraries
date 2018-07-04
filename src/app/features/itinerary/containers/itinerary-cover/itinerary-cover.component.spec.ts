import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryCoverComponent } from './itinerary-cover.component';

describe('ItineraryCoverComponent', () => {
  let component: ItineraryCoverComponent;
  let fixture: ComponentFixture<ItineraryCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryCoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
