import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public apiEndpoint: {} = {
    favorite: 'rgs_favorite',
    user:     'rgs_user',
    config:   'rgs_itineraries'
  };

  constructor(
    private storage: Storage,
  ) { }

  public set(api: 'favorite'|'user'|'config', settingName,value){
    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }
    return this.storage.set(`${ this.apiEndpoint[api] }:${ settingName }`,value);
  }

  public async get(api: 'favorite'|'user'|'config', settingName){
    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }
    return await this.storage.get(`${ this.apiEndpoint[api] }:${ settingName }`);
  }

  public async remove(api: 'favorite'|'user'|'config', settingName){
    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }
    return await this.storage.remove(`${ this.apiEndpoint[api] }:${ settingName }`);
  }
  
  public clear(api: 'favorite'|'user'|'config' ) {
    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }
    this.storage.clear().then(() => {
      console.log('all keys cleared');
    });
  }

  public get2( api: 'favorite'|'user'|'server' ){
    
    /*if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }*/
    return this.storage.get( api );
  }

  public set2( api: 'favorite'|'user'|'server', value:any ){

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

  remove2( api: 'favorite'|'user'|'server', param:string ){

    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }

    //return this.storage.set( key, param );
  }

  clear2( api: 'favorite'|'user'|'server', param:string ){

    if ( ! this.apiEndpoint[api] ) {
      return of( new Error('STORAGE SERVICE API Endpoint do not exist.') );
    }
    
    //return this.storage.set( key, param );
  }
}
