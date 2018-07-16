import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { IonicModule } from '@ionic/angular';

import { ItineraryRoutingModule } from './itinerary.routing';
import { ItineraryCoverComponent } from './containers/itinerary-cover/itinerary-cover.component';
import { ItineraryPointComponent } from './containers/itinerary-point/itinerary-point.component';
import { ReplaceUrlPipe } from '../../pipes/replace-url.pipe';

import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { ItineraryPointsComponent } from '../../shared/components/itinerary-points/itinerary-points.component';
import { ItineraryMapComponent } from '../../shared/components/itinerary-map/itinerary-map.component';
import { MapComponent } from '../../shared/components';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    CommonModule,
    ItineraryRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  entryComponents: [ItineraryPointsComponent, ItineraryMapComponent],
  declarations: [
    ItineraryCoverComponent, 
    ItineraryPointComponent,
    ItineraryPointsComponent,
    ItineraryMapComponent,
    ReplaceUrlPipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    MapComponent
  ]
})
export class ItineraryModule { }
