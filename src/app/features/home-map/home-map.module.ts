import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HomeMapRoutingModule } from './home-map.routing';
import { HomeMapComponent } from './containers/home-map/home-map.component';
import { SharedModule } from '../../shared/shared.module';
import { HomePageHeaderModule } from '../home-page-header/home-page-header.module';
//--------------------
@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    HomeMapRoutingModule,
    HomePageHeaderModule
  ],
  declarations: [HomeMapComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeMapModule { }
