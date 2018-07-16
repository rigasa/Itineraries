import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-page.routing';
import { HomePageComponent } from './containers/home-page/home-page.component';
//--------------------
import { HomePageHeaderModule } from '../home-page-header/home-page-header.module';
//--------------------
@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomePageRoutingModule,
    HomePageHeaderModule
  ],
  declarations: [HomePageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule { }
