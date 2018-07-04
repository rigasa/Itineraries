import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './containers/home-page/home-page.component';

const routes: Routes = [
 {
    path: 'home',
    component: HomePageComponent,
    children: [
      {
        path: 'map',
        outlet: 'map',
        loadChildren: '../home-map/home-map.module#HomeMapModule'
      },
      {
        path: 'list',
        outlet: 'list',
        loadChildren: '../home-list/home-list.module#HomeListModule'
      }
    ]
  },
  {
    path: 'itinerary',
    loadChildren: '../itinerary/itinerary.module#ItineraryModule'
  },
  {
    path: '',
    redirectTo: '/home/(map:map)'
  }
  /* ,
  {
    path: 'point',
    loadChildren: '../point/point.module#PointModule'
  },*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
