import { Component, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
//--------------------
import { Observable } from 'rxjs';
//--------------------
import { ItinerariesService } from '../../../../shared/services/itineraries/itineraries.service';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import { ConfigService } from '../../../../shared/services/config/config.service';
import { IItinerary } from '../../../../models/itinerary.model';
import { IItineraryPage } from '../../../../models/itinerary-page.model';
//--------------------
// MODAL 
import { ModalController } from '@ionic/angular';
import { ItineraryPointsComponent } from '../../../../shared/components/itinerary-points/itinerary-points.component';
import { ItineraryMapComponent } from '../../../../shared/components/itinerary-map/itinerary-map.component';
//--------------------
@Component({
  selector: 'app-itinerary-cover',
  templateUrl: './itinerary-cover.component.html',
  styleUrls: ['./itinerary-cover.component.scss', '../tools/itinerary.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ItineraryCoverComponent implements OnInit, AfterViewInit {
  //--------------------
  public itinerary$: Observable<any>;
  public itiId = null;
  public isFavorite: boolean = false;
  public imgUrl: string = '';
  public imgSearch: string = '';
  public imgReplace: string = '';
  public language: string[] = [];
  //--------------------
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _itiService: ItinerariesService,
    private _location: Location,
    private _fav: FavoritesService,
    private _config: ConfigService,
    private _modalCtrl: ModalController
  ) { }
  //--------------------
  ngOnInit() {
    this.itiId = this._route.snapshot.params.id;

    this._config.getConfigItem( 'cdn_photos_url' ).then( val=>{
      this.imgUrl = val;
      this.imgSearch = '<img class="logo-intern" src="';
      this.imgReplace = '<img class="logo-intern" src="' + this.imgUrl;
      // LOAD ITINERARY COVER
      this.itinerary$ = this._itiService.loadItinerary( this.itiId );
     
    });

    this._config.getCurLanguage().then( ( language ) => {
      this.language = language;
    });
    
    this._fav.isFavorite( this.itiId ).then(isFav => {
      this.isFavorite = isFav;
    })
    
  }
  //--------------------
  ngAfterViewInit(){
    //this.imgUrl = this._config.getConfigItem( 'cdn_photos_url' ).then( val=>{

      //this.fixImages( val );
    //});
  }
  //--------------------
  toBack() {
    this._location.back();
  }
  //--------------------
  goFavorite( _item ){
    console.log( 'CLICK FAVORITE', _item );
  }
  //--------------------
  goShare( _item ){
    console.log( 'CLICK SHARE', _item );
  }
  //--------------------
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
  //--------------------
  unfavoriteItem() {
    /*this._fav.unFavoriteItem( this.itiId ).then(() => {
      this.isFavorite = false;
    });*/
  }
  //--------------------
  shareItinerary() {
    /*let email = {
      to: 'info@genevedurable.ch',
      subject: 'I love this one: ' + this.film.title,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
 
    this.emailComposer.open(email);*/
  }
  //-------------------------------
  async pointsOpen(){
    let modal = await this._modalCtrl.create( {
      component: ItineraryPointsComponent,
      componentProps: {
        itinerary: {
          id: this.itiId,
          point: 0, 
          record: this.itinerary$
        }
      }
    });
    // check on modal is dismiss
    modal.onDidDismiss(data => this.displayDismissData(data));
    // open modal
    return await modal.present();
  }
  //-------------------------------
  async mapOpen(){
   let modal = await this._modalCtrl.create( {
      component: ItineraryMapComponent,
      componentProps: {
        itinerary: {
          id: this.itiId,
          point: 0, 
          record: this.itinerary$,
          mOptions: {
            latitude: 46.2587, 
            longitude: 6.11938, 
            zoom: 11, 
            customStyle: false
          }
        }
      }
    });
    // check on modal is dismiss
    modal.onDidDismiss(data => this.displayDismissData(data));
    // open modal
    return await modal.present();
   
  }
  //--------------------
  displayDismissData(data) {
    console.log('Modal closing...', data);
  }
  //-------------------------------
  goToHome() {
    this._router.navigate(['/' ] );
  }
  //-------------------------------
}
