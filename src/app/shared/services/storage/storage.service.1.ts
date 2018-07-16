import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService1 {

  public apiEndpoint: {} = {
    favorite: 'rgs_favorite',
    user: 'rgs_user',
    config: 'rgs_itineraries'
  };

  constructor(
    private storage: Storage,
  ) { }

  getObject( key:string ){
    if ( ! key ) {return;}

    let value = localStorage.getItem( key );
    
    if (!value) {return;}

    if (value[0] === "{") {
      return JSON.parse( value );
    }

    return value;
  }
 
  setObject( key:string, value:object ){
    
    if (! key || ! value) {return;}
    
    if (typeof value === "object") {
      localStorage.setItem( key, JSON.stringify( value ) );
    }

  }

  getAllByApi( api: 'favorite'|'user'|'server' ) {

    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }

    return this.storage.get( api );
  }

  public get( api: 'favorite'|'user'|'server' ){
    
    /*if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }*/
    return this.storage.get( api );
  }

  public set( api: 'favorite'|'user'|'server', value:any ){

    //if ( ! this.apiEndpoint[api] ) {
      //return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    //}
    /*return this.getAllByApi( api ).then(result => {
      console.log( 'VALUES', result );

      let _setup = [key] = values;

      if (result) {
        //result.push(_setup);
        return this.storage.set( api, _setup);
      } else {
        let _setup = [key] = values;
        return this.storage.set( api, _setup );
      }
    });*/
    return this.storage.set( api, value );
  }

  remove( api: 'favorite'|'user'|'server', param:string ){

    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }

    //return this.storage.set( key, param );
  }

  clear( api: 'favorite'|'user'|'server', param:string ){

    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }
    
    //return this.storage.set( key, param );
  }
}
