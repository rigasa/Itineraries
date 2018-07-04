import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryPointComponent } from './itinerary-point.component';

describe('ItineraryPointComponent', () => {
  let component: ItineraryPointComponent;
  let fixture: ComponentFixture<ItineraryPointComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryPointComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
