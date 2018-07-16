import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritesComponent } from './containers/favorites/favorites.component';

const routes: Routes = [
  {
    path: 'favorites',
    outlet: 'favorites',
    component: FavoritesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
