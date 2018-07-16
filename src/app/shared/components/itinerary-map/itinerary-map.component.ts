import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
//--------------------
import { MapConfig } from '../map/map.config';
import { IMapConfig } from '../map/map.config.interface';
import { IItinerary } from '../../../models/itinerary.model';
import { ConfigService } from '../../services/config/config.service';
//--------------------
import { MapComponent } from '../map/map.component';
import { IItineraryMarker } from '../../../models/itinerary-marker.model';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { ItinerariesService } from '../../services/itineraries/itineraries.service';
//--------------------
@Component({
  selector: 'app-itinerary-map',
  templateUrl: './itinerary-map.component.html',
  styleUrls: ['./itinerary-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItineraryMapComponent implements OnInit {
  //----------------------------------
  public itiId: any;
  public pointId: any;
  public points$: Observable<any>;
  public imgUrl: string;
  public language: string[] = [];
  public mOptions: IMapConfig;
  public defaultSettings: object = {
    latitude: 46.2587, 
    longitude: 6.11938, 
    zoom: 11, 
    customStyle: false
  };
  //----------------------------------
  private _map: any;
  //----------------------------------
  constructor(
    private _router: Router,
    private _config: ConfigService,
    private _modalCtl: ModalController,
    private _navParams: NavParams,
    private _mapCompo: MapComponent,
    private _fav: FavoritesService,
    private _itiService: ItinerariesService
  ) { }

  //----------------------------------
  ngOnInit() {
    const {itinerary} = this._navParams.data;
    this.itiId = itinerary.id;
    this.pointId = itinerary.point;
    //this.points$ = itinerary.record;
    // LOAD ITINERARY POINTS
    this.points$ = this._itiService.loadItinerary( this.itiId );
    this.mOptions = itinerary.mOptions || this.defaultSettings;
    //
    this._config.getCurLanguage().then( ( language ) => {
      this.language = language;
    });
  }
  //----------------------------------
  onPoint( point: IItineraryMarker ): void{
    this.pointId = point.id;
    this.toDismiss();
    this._router.navigate(['itinerary', this.itiId, point.id ] );
  }
  //-----------------------
  setFavorit( point: IItineraryMarker ): void {
    this._fav.setPointFavorite( this.itiId, point );
  }
  //-----------------------
  shareFavorite( point: IItineraryMarker ) {
    this._fav.sharePointFavorite( this.itiId, point );
  }
  //----------------------------------
  toDismiss() {
    this._modalCtl.dismiss();
  }
  //----------------------------------
  //----------------------------------
  //----------------------------------
}
