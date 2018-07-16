import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites.routing';
import { FavoritesComponent } from './containers/favorites/favorites.component';

@NgModule({
  imports: [
    CommonModule,
    FavoritesRoutingModule
  ],
  declarations: [FavoritesComponent]
})
export class FavoritesModule { }
