import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Config } from './config';
import { Languages } from './languages.datas';
//import { GenericHttpService } from '../generic-http/generic-http.service';

const STORAGE_CONFIG_KEY = 'rgs_itineraries';

enum EConfig {
  config = 'config',
  languages = 'languages'
};

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //-----------------------------
  constructor(
    private _storage: Storage,
    //private _http: GenericHttpService
  ) {
    //this.removeConfig();
    this.initializeConfig();

    /*this.getCurLanguage().then( ( val ) => {
      
    console.log( 'TEST:: ', val );

    });*/

  }
  //-----------------------------
  getConfigName(){
    return STORAGE_CONFIG_KEY;
  }
  //-----------------------------
  initializeConfig() {
      this.getAllConfig().then( ( val ) => {
        if( ! val ){
          this.setDefaultConfig();
        }
      });
  }
  //-----------------------------
  setDefaultConfig(): void{
    this.setConfig( Config, Languages );
  }
  //-----------------------------
  getAllConfig(): any {
    return this._storage.get( this.getConfigName() );
  }
  //-----------------------------
  setConfig( _config: object = Config, _languages: object = Languages ): any{
    const _defaults: object = {
      config: _config,
      languages: _languages
    };

    return this._storage.set( this.getConfigName(), _defaults );
  }
  //-----------------------------
  removeConfig() : any {
   return this._storage.remove( this.getConfigName() );
  }
  //-----------------------------
  getConfigCategory( _category: string ): any {
    return this.getAllConfig().then( ( val ) => {

      if( typeof( EConfig[ _category ] ) !== 'undefined' ){
        return val[ _category ];
      }else{
          return null;
      };

    });
  }
  //-----------------------------
  getConfigItem( _item: string ): any {

    return this.getAllConfig().then( ( val ) => {

      let _value = null;

      for (const _constante in EConfig) {

        for (const _arg in val[ _constante ]) {

          if( ( typeof( val[ _constante ][_arg ] ) === 'object' ) && ( _item !== _arg ) ){

            for (const _child in val[ _constante ][ _arg ]) {

              if( _child === _item ){
                return val[ _constante ][ _arg ][ _child ];
              }
            } 

          }else{
            if( _arg === _item ){
              return val[ _constante ][_arg ];
            }
          }

        }

      }
      return _value;
      
    });
  }
  //-----------------------------
  getCurLanguage(): any{
    return this.getConfigItem( 'lang' ).then( ( val ) => {
      if( typeof( Languages[ val ] ) !== 'undefined' ){
        return Languages[ val ];
      }else{
        return null;
      }
    });
  }
  //-----------------------------
  setCurLanguage( language:string = 'fr-FR' ){

  }
  //-----------------------------
  //-----------------------------
  //-----------------------------
}
