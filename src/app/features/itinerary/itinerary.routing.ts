import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItineraryCoverComponent } from './containers/itinerary-cover/itinerary-cover.component';
import { ItineraryPointComponent } from './containers/itinerary-point/itinerary-point.component';

const routes: Routes = [
  {
    path: ':id',
    component: ItineraryCoverComponent
  },/*{
    path: ':id/:id',
    component: ItineraryPointComponent
  },*/
  {
    path: '',
    redirectTo: '/home/(map:map)'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItineraryRoutingModule { }
