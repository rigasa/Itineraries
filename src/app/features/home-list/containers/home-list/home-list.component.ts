import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//--------------------
import { IItineraries } from '../../../../models/itineraries.model';
//--------------------
import { ItinerariesService } from '../../../../shared/services/itineraries/itineraries.service';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import { ConfigService } from '../../../../shared/services/config/config.service';
import { UsersService } from '../../../../shared/services/users/users.service';
//--------------------
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
  //encapsulation: ViewEncapsulation.None
})
//--------------------
export class HomeListComponent implements OnInit {
  //-----------------------
  public itineraries$: Observable<any[]>;
  public language: string[] = [];
  //-----------------------
  constructor( 
    private _router: Router,
    private _itiService: ItinerariesService,
    private _config: ConfigService,
    private _fav: FavoritesService,
    private _us: UsersService
  ) { }
  //-----------------------
  ngOnInit() {
    this.itineraries$ = this._itiService.loadItineraries();
    this._config.getCurLanguage().then( ( language ) => {
      this.language = language;
    });
  }
  //-----------------------
  goItinerary( itinerary: IItineraries ): void {
    this._router.navigate(['itinerary', itinerary.id ] );
  }
  //-----------------------
  setFavorit( itinerary: IItineraries ): void {
    this._fav.setItineraryFavorite( itinerary );
  }
  //-----------------------
  shareFavorite( itinerary: IItineraries ): void {
    this._fav.shareItineraryFavorite( itinerary );
  }
  //-----------------------
}
//--------------------