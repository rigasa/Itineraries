import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-itinerary-map',
  templateUrl: './itinerary-map.component.html',
  styleUrls: ['./itinerary-map.component.scss']
  //encapsulation: ViewEncapsulation.None
})
export class ItineraryMapComponent implements OnInit {

  constructor() { }

  public defaultSettings = {
    latitude: 46.2587, 
    longitude: 6.11938, 
    zoom: 11, 
    customStyle: false
  };

  ngOnInit() {
  }

}
