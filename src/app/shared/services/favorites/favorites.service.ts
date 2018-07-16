// https://ionicacademy.com/store-data-inside-ionic/
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
//-----------------------------
import { IItineraries } from '../../../models/itineraries.model';
import { IFavorite } from '../../../models/favorite.model';
import { IItineraryMarker } from '../../../models/itinerary-marker.model';
//-----------------------------
import { StorageService } from '../storage/storage.service';
import { UsersService } from '../users/users.service';
//import { GenericHttpService } from '../generic-http/generic-http.service';
//-----------------------------
const STORAGE_FAVORITES_KEY = 'rgs_favorite';
//-----------------------------
@Injectable()
export class FavoritesService {
  //-----------------------------
  constructor(
    private storage: Storage,
    private _save: StorageService,
    private _us: UsersService,
    //private _http: GenericHttpService
  ) { }
  //-----------------------------
  isFavorite(favoriteId) {
    return this.getAllFavorites().then(result => {
      return result && result.indexOf(favoriteId) !== -1;
    });
  }
  //-----------------------------
  setFavoriteItem(favoriteId) {
    return this.getAllFavorites().then(result => {

      if (result) {
        // CHECK IS DUPLICATA
        for (let elem of result) {
          if( elem.name === favoriteId.name ){
            return null;
          }
        };

        result.push(favoriteId);

        return this.storage.set(STORAGE_FAVORITES_KEY, result);

      } else {
        return this.storage.set(STORAGE_FAVORITES_KEY, [favoriteId]);
      }
    });
  }
  //-----------------------------
  unFavoriteItem(favoriteId) {
    return this.getAllFavorites().then(result => {
      if (result) {
        var index = result.indexOf(favoriteId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_FAVORITES_KEY, result);
      }
    });
  }
  //-----------------------------
  getAllFavorites() {
    return this.storage.get(STORAGE_FAVORITES_KEY);
  }
  //-----------------------------
  //-----------------------------
  //-----------------------------
  // ITINERARY
  //-----------------------------
  //-----------------------------
  //-----------------------------
  getItineraryFavorite( id ): any{
    
  }
  //-----------------------------
  setItineraryFavorite( itinerary: IItineraries ): void{

    if( this._us.isConnected() ){

      const userId: any = this._us.getCurUserId();
      const newDate = new Date();
      const newFavorit: IFavorite =  {
        name: itinerary.iti_name,
        path: '/itinerary/' + itinerary.id,
        userId: userId,
        created: {
          "$date": newDate.toISOString()
        },
        modified: {
          "$date": newDate.toISOString()
        },
        lang: 'fr-FR'
      }
      
      this.setFavoriteItem( newFavorit ).then(( response )=>{
        if( response ){
          console.log('FAVORITE ADDED' );
        }else{
          console.log('FAVORITE EXISTS' );
        }
      });

    } else {
      this._us.openLoginUser();
    }
  }
  //-----------------------------
  shareItineraryFavorite( itinerary: IItineraries ): void {
    /*let email = {
      to: 'saimon@devdactic.com',
      subject: 'I love this one: ' + itinerary.iti_name,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
 
    this.emailComposer.open(email);*/
    console.log( 'SHARE ITINERARY FAVORITE' );
  }
  //-----------------------------
  //-----------------------------
  //-----------------------------
  // POINTS
  //-----------------------------
  //-----------------------------
  //-----------------------------
  getPointFavorite( id ): void{
    
  }
  //-----------------------------
  setPointFavorite( _itiId, point: IItineraryMarker ): void{
    if( this._us.isConnected() ){

      const userId: any = this._us.getCurUserId();
      const newDate = new Date();
      const newFavorit: IFavorite =  {
        name: point.imk_shortTitle,
        path: '/itinerary/' + _itiId + '/' + point.id,
        userId: userId,
        created: {
          "$date": newDate.toISOString()
        },
        modified: {
          "$date": newDate.toISOString()
        },
        lang: 'fr-FR'
      }
      
      this.setFavoriteItem( newFavorit ).then(( response )=>{
        if( response ){
          console.log('FAVORITE ADDED' );
        }else{
          console.log('FAVORITE EXISTS' );
        }
      });

    } else {
      this._us.openLoginUser();
    }
  }
  //-----------------------------
  sharePointFavorite(  _itiId, point: IItineraryMarker ): void {
    /*let email = {
      to: 'saimon@devdactic.com',
      subject: 'I love this one: ' + point.imk_shortTitle,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
 
    this.emailComposer.open(email);*/
    console.log( 'SHARE POINT FAVORITE' );
  }
  //-----------------------------
  //-----------------------------
 
}