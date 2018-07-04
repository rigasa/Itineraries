import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { MapConfig } from './map.config';
import { IMapConfig } from './map.config.interface';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  //--------------
  @Input() mapSettings: IMapConfig;
  //--------------
  private _map: any;
  private _promise: any;
  private _settings: IMapConfig;
  //--------------
  constructor() {}
  //--------------
  ngAfterViewInit() {
   // this._settings = this.getSettings();

    this.startMap();
  }
  //----------------------------------
  //----------------------------------
  //----------------------------------
  // INIT MAP
  //----------------------------------
  //----------------------------------
  //----------------------------------
  startMap(): void {
  
    if ( typeof( google ) === 'undefined' ) {
      const API_KEY = this.mapSettings.api_key || MapConfig["api_key"]
      this.loadGMapsAPI( API_KEY )
      .then(( response: any ) => {
          this.initMap();
      });

    } else {
      this.initMap();
    }
  }

  initMap(): void {
    //
    const POSITION = {
      lat: this.mapSettings.latitude || MapConfig["latitude"], 
      lng: this.mapSettings.longitude || MapConfig["longitude"]
    };
    const SELECTOR = this.mapSettings.selector || MapConfig["selector"];
    const ZOOM = this.mapSettings.zoom || MapConfig["zoom"];
    //---------------------------------
    // Create Map
    this._map = new google.maps.Map(document.getElementById( SELECTOR ), {
      zoom: ZOOM,
      center: POSITION
    });
    //---------------------------------
    // Custom style if selected

    const STYLE = this.mapSettings.customStyle || MapConfig["customStyle"];
    if( STYLE ){
      let _style = this.getCustomStyle(); 
      this._map.setOptions( { styles: _style } );
    }
    //---------------------------------
    console.log( 'MAP SETTINGS:: ', this.mapSettings);
    console.log( 'TYPE MAP SETTINGS:: ', typeof(this.mapSettings.markers));
    console.log( 'LENGTH MAP SETTINGS:: ', this.mapSettings.markers.length);

    const MARKERS = this.mapSettings.markers; // || MapConfig["markers"];

    if( MARKERS ){
      this.setMarkers( MARKERS );
    }
    //---------------------------------
  }
  //----------------------------------
  //----------------------------------
  //----------------------------------
  // CUSTOM STYLES
  // https://developers.google.com/maps/documentation/javascript/styling
  //----------------------------------
  //----------------------------------
  //----------------------------------
  getCustomStyle(): any[]{

   return [
  	  {
  		stylers: [
  		  { hue: "#00ffe6" },
  		  { saturation: -20 }
  		]
  	  },{
  		featureType: "road",
  		elementType: "geometry",
  		stylers: [
  		  { lightness: 100 },
  		  { visibility: "simplified" }
  		]
  	  },{
  		featureType: "road",
  		elementType: "labels",
  		stylers: [
  		  { visibility: "off" }
  		]
  	  }
  	];
  }

  //----------------------------------
  //----------------------------------
  //----------------------------------
  // Utilities
  //----------------------------------
  //----------------------------------
  //----------------------------------
  getSettings(){
    // Fusion de mapSettings avec MapConfig
   let _newSettings = Object.assign( this.mapSettings, MapConfig );
    //console.log( 'NEW:: ', _newSettings );

     /*if( this.mapSettings.markers ){
      MapConfig.markers = this.mapSettings["markers"];
      console.log( 'MARKERS:: ', typeof( this.mapSettings ) );
    }
    return jQuery.extend( MapConfig, this.mapSettings );
    //console.log( 'GET SETTINGS:: ', this.mapSettings );*/

   // console.log( 'MARKERS:: ', typeof( _newSettings.markers ) );

    return _newSettings;
  }
  //----------------------------------
  //Load the Google Maps API javascript
  loadGMapsAPI( key ): any {

    if (typeof( this._promise ) === 'undefined' ) {
      this._promise = new Promise( resolve => {
        window['__onGapiLoaded'] = (ev) => {
          resolve(google);
        }
        if ( typeof google === 'undefined') {
          const _script = document.createElement('script');
          _script.src = `//maps.googleapis.com/maps/api/js?key=${key}&callback=__onGapiLoaded`;
          _script.async = true;
          document.body.appendChild( _script );
        } else {
          resolve();
        }
      });
    }
    return this._promise;
  }
  //----------------------------------
  setMarkers( _markers: any[] ): void {
    console.log('::: SET MARKERS', _markers );
    _markers.forEach( ( _item )=>{

      if( _markers["iti_type"] !== '0' ){
        console.log('::: ITEM', _item );
      };

      /*const marker = new google.maps.Marker({
        position: POSITION,
        map: this._map
      });*/

    });
    
  }
  //----------------------------------
  //----------------------------------

}
