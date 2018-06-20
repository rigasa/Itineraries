import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HomeListRoutingModule } from './home-list.routing';
import { HomeListComponent } from './containers/home-list/home-list.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeListRoutingModule
  ],
  declarations: [HomeListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeListModule { }
