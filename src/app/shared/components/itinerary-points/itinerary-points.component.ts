import { Component, OnInit, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ModalController, NavParams } from '@ionic/angular';
//--------------------
import { IItineraries } from '../../../models/itineraries.model';
import { IItineraryMarker } from '../../../models/itinerary-marker.model';
//--------------------
import { ConfigService } from '../../services/config/config.service';
import { FavoritesService } from '../../services/favorites/favorites.service';
import { ItinerariesService } from '../../services/itineraries/itineraries.service';
//--------------------
enum IconsType {
  green,
  blue,
  gray
}
//--------------------
@Component({
  selector: 'app-itinerary-points',
  templateUrl: './itinerary-points.component.html',
  styleUrls: ['./itinerary-points.component.scss', '../../../../assets/styles/points.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItineraryPointsComponent implements OnInit {
  //-----------------------
  public itiId: any;
  public pointId: any;
  public points$: Observable<any>;
  public imgUrl: string;
  public language: string[] = [];
  public iconsType = IconsType;
  public filterPoints: string = "objects";
  //-----------------------
  constructor(
    private _router: Router,
    private _modalCtl: ModalController,
    private _navParams: NavParams,
    private _config: ConfigService,
    private _fav: FavoritesService,
    private _itiService: ItinerariesService
  ) { }
  //-----------------------
  ngOnInit() {
    //
    const {itinerary} = this._navParams.data;
    this.itiId = itinerary.id;
    this.pointId = itinerary.point;
    //this.points$ = itinerary.record;
    // LOAD ITINERARY POINTS
    this.points$ = this._itiService.loadItinerary( this.itiId );
    //
    this._config.getCurLanguage().then( ( language ) => {
      this.language = language;
    });
    this.setSegment( 0 );
  }
  //-----------------------
  goPoint( point: IItineraryMarker ): void {
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
  //-----------------------
  setSegment( _curType ){
    let _classHide = 'icon-point';
    let _classShow = 'icon-' + this.iconsType[_curType];

    let _items: HTMLCollection = document.getElementsByClassName(_classHide), i;

    //console.log( 'ITEM', _items );

    for (let i = 0; i < _items.length; i++) {
      //let _elem: ElementRef =  _items.item(i);
      _items.item(i)[ "style" ].display = 'none';
    }
    let _showItems: HTMLCollection = document.getElementsByClassName(_classShow);

    for (let i = 0; i < _showItems.length; i++) {
      //let _elem: ElementRef =  _showItems.item(i);
      _showItems.item(i)[ "style" ].display = 'block';
    }

  }
  //-----------------------
  segmentChanged(ev: any) {
    console.log('Segment changed', this.iconsType[ev.detail.value]);
    this.setSegment( ev.detail.value );
  }
  //-----------------------
  toDismiss() {
    this._modalCtl.dismiss();
  }
  //-----------------------
}
