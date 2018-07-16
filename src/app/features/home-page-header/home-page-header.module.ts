import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageHeaderComponent } from './containers/home-page-header/home-page-header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomePageHeaderComponent],
  exports: [
    HomePageHeaderComponent
  ],
  providers: [ ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageHeaderModule { }
