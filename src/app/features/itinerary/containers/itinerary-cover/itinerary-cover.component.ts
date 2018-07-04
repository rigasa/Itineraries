import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//--------------------
import { Observable } from 'rxjs';
//--------------------
import { ItinerariesService } from '../../../../shared/services/itineraries/itineraries.service';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import { ConfigService } from '../../../../shared/services/config/config.service';
import { IItinerary } from '../../../../models/itinerary.model';
import { IItineraryPage } from '../../../../models/itinerary-page.model';
//--------------------
// MENU 
//--------------------
@Component({
  selector: 'app-itinerary-cover',
  templateUrl: './itinerary-cover.component.html',
  styleUrls: ['./itinerary-cover.component.scss', '../tools/itinerary.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItineraryCoverComponent implements OnInit, AfterViewInit {

  public itinerary$: Observable<any>;
  public itiId = null;
  public isFavorite: boolean = false;
  public imgUrl: string = '';
  public imgSearch = '';
  public imgReplace = '';

  constructor(
    private _route: ActivatedRoute,
    private _itiService: ItinerariesService,
    private _location: Location,
    private _fav: FavoritesService,
    private _config: ConfigService
  ) { }

  ngOnInit() {
    this.itiId = this._route.snapshot.params.id;

    this._config.getConfigItem( 'cdn_photos_url' ).then( val=>{
      this.imgUrl = val;
      this.imgSearch = '<img class="logo-intern" src="';
      this.imgReplace = '<img class="logo-intern" src="' + this.imgUrl;
      // LOAD ITINERARY COVER
      this.itinerary$ = this._itiService.loadItinerary( this.itiId );
     
    });


    this._fav.isFavorite( this.itiId ).then(isFav => {
      this.isFavorite = isFav;
    })
    
  }

  ngAfterViewInit(){
    //this.imgUrl = this._config.getConfigItem( 'cdn_photos_url' ).then( val=>{

      //this.fixImages( val );
    //});
  }

  toBack() {
    this._location.back();
  }

  favoriteItem() {
    /*this._fav.setFavoriteItem( this.itiId ).then(() => {
      this.isFavorite = true;
    });*/
    /*const _link = {
      link: 'http://localhost:4200/itinerary/' + itinerary.id,
      name: itinerary.iti_name
    }
    // FavoritesService
    this._fav.setFavoriteItem( _link ).then(() => {
      console.log('::: Save Favorit', _link );
      //this.isFavorite = true;
    });*/

  }
 
  unfavoriteItem() {
    /*this._fav.unFavoriteItem( this.itiId ).then(() => {
      this.isFavorite = false;
    });*/
  }

  shareItinerary() {
    /*let email = {
      to: 'info@genevedurable.ch',
      subject: 'I love this one: ' + this.film.title,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
 
    this.emailComposer.open(email);*/
  }

}
