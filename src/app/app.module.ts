// https://codingthesmartway.com/angular-material-and-angular-6-material-design-for-angular/
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { enableProdMode } from '@angular/core';

// STORAGE
import { IonicStorageModule } from '@ionic/storage';

// AUTH

// PIPES

enableProdMode();

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    ServiceWorkerModule.register('/ngsw-worker.js',
    { enabled: environment.production }),
    IonicStorageModule.forRoot()
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
