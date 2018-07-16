import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//--------------------
import { IItineraries } from '../../../../models/itineraries.model';
//--------------------
import { ItinerariesService } from '../../../../shared/services/itineraries/itineraries.service';
import { IMapConfig } from '../../../../shared/components/map/map.config.interface';
import { ConfigService } from '../../../../shared/services/config/config.service';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
//--------------------
@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
  //encapsulation: ViewEncapsulation.None
})
export class HomeMapComponent implements OnInit {

  //-----------------------
  public itineraries$: Observable<any[]>;
  public defaultSettings: IMapConfig = {
    latitude: 46.2587, 
    longitude: 6.11938, 
    zoom: 11, 
    customStyle: true,
    markers: []
  };
  public language: string[] = [];
  //-----------------------
  constructor( 
    private _router: Router,
    private _itiService: ItinerariesService,
    private _config: ConfigService,
    private _fav: FavoritesService
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
