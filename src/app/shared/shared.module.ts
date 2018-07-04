import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';
//------------------------------
import { MapComponent } from './components/map/map.component';
import { ItineraryMapComponent } from './components/itinerary-map/itinerary-map.component';
import { ItineraryPointsComponent } from './components/itinerary-points/itinerary-points.component';
//------------------------------
import { GenericHttpService } from './services/generic-http/generic-http.service';
import { ItinerariesService } from './services/itineraries/itineraries.service';
import { ConfigService } from './services/config/config.service';

import { FavoritesService } from './services/favorites/favorites.service';
//------------------------------
const COMPONENTS: any[] = [
  MapComponent, 
  ItineraryMapComponent, 
  ItineraryPointsComponent
];
//------------------------------
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule
  ],
  declarations: [...COMPONENTS],
  exports: [
    ...COMPONENTS,
    CommonModule
  ],
  providers: [
    GenericHttpService,
    ItinerariesService,
    ConfigService,
    FavoritesService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
//------------------------------
export class SharedModule { }
