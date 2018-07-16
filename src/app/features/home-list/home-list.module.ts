import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../shared/shared.module';

import { HomeListRoutingModule } from './home-list.routing';
import { HomeListComponent } from './containers/home-list/home-list.component';
import { HomePageHeaderModule } from '../home-page-header/home-page-header.module';
//--------------------
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    IonicModule,
    HomeListRoutingModule,
    HomePageHeaderModule
  ],
  declarations: [HomeListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeListModule { }
