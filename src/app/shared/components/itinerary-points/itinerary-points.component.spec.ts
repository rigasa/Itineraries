import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryPointsComponent } from './itinerary-points.component';

describe('ItineraryPointsComponent', () => {
  let component: ItineraryPointsComponent;
  let fixture: ComponentFixture<ItineraryPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
