import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';

const COMPONENTS: any[] = [
  MapComponent
];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...COMPONENTS],
  exports: [
    ...COMPONENTS,
    CommonModule
  ],
  providers: [
    
  ]
})
export class SharedModule { }
