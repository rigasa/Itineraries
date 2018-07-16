import { Component, OnInit } from '@angular/core';
//--------------------
import { ConfigService } from '../../../../shared/services/config/config.service';
//--------------------
import { UsersService } from '../../../../shared/services/users/users.service';

@Component({
  selector: 'app-home-page-header',
  templateUrl: './home-page-header.component.html',
  styleUrls: ['./home-page-header.component.scss']
})
export class HomePageHeaderComponent implements OnInit {

  public language: string[] = [];
  public isConnected: boolean;

  constructor(
    private _config: ConfigService,
    private _us: UsersService
  ) { }
  
  ngOnInit() {
    this._config.getCurLanguage().then( ( language ) => {
      this.language = language;
    });
    this.isConnected = this._us.isConnected();
  }

  onConnect(){
    console.log( 'CONNECT', this.isConnected );
  }

  onFavorit(){
    console.log( 'FAVORIT' );
  }

}
