import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeMapComponent } from './containers/home-map/home-map.component';

const routes: Routes = [
  {
    path: '',
    outlet: 'map',
    component: HomeMapComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeMapRoutingModule { }
