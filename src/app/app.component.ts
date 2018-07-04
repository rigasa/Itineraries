import { Component } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private _platform: Platform,
    private _menuCtl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this._platform.ready().then(() => {
    });
  }


}
