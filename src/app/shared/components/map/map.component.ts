import { Component, OnInit, AfterViewInit, OnDestroy, Input, ViewEncapsulation } from '@angular/core';
import { MapConfig } from './map.config';
import { IMapConfig } from './map.config.interface';
import { Observable } from 'rxjs';
//import * as jQuery from 'jquery';
//--------------------
import { Router } from '@angular/router';
//--------------------
import { ConfigService } from '../../services/config/config.service';
import { UsersService } from '../../services/users/users.service';
import { FavoritesService } from '../../services/favorites/favorites.service';
//--------------------
import { ItinerariesService } from '../../services/itineraries/itineraries.service';
import { IItineraries } from '../../../models/itineraries.model';
import { IItinerary } from '../../../models/itinerary.model';
import { _MatChipListMixinBase } from '@angular/material';
//--------------------
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  //--------------
  @Input() mapSettings: IMapConfig;
  @Input() mapMarkers: Observable<any[]>;
  @Input() mapPoints: Observable<any[]>;
  @Input() mapContext: any;
  //--------------
  private _map: any = null;
  private _promise: any;
  private _settings: IMapConfig;
  private _markers$: Observable<any[]>;
  private _itinerary$: Observable<any[]>;
  private _urls: any;
  private _polygons: string[] = [];
  private _oldPoint: any = null;
  private _oldIconPoint: any = null;
  //--------------
  public language: string[] = [];
  public urlRoot = 'http://ateliers.nomades.ch/~garciasanchez/itineraries2/site/';
  //--------------
  constructor(
    private _config: ConfigService,
    private _itiService: ItinerariesService,
    private _fav: FavoritesService,
    private _us: UsersService,
    private _router: Router,
  ) {}

  ngOnInit(){

    this._config.getConfigItem( 'paths' ).then( _val =>{
      this._urls = _val;
    });

    this._config.getCurLanguage().then( ( language ) => {
      this.language = language;
    });
  }
  //--------------
  ngAfterViewInit() {
   // this._settings = this.getSettings();
   //if( this.mapMarkers ){
    this.startMap();
   //}
  }

  ngOnDestroy(){
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
  //---------------------------------
  //---------------------------------
  initMap(): void {
    //
    const SELECTOR = this.mapSettings.selector || MapConfig["selector"];
    const POSITION = {
      lat: this.mapSettings.latitude || MapConfig["latitude"], 
      lng: this.mapSettings.longitude || MapConfig["longitude"]
    };
    const ZOOM = this.mapSettings.zoom || MapConfig["zoom"];
    //---------------------------------
    // Create Map
    let _mapOptions = {
      zoom: ZOOM,
      center: POSITION,
      panControl: false,
      zoomControl: false,
      mapTypeControl: false,
      scaleControl: false,
      streetViewControl: false,
      overviewMapControl: false,
      scrollwheel: false
    };
    if( this._map ){
      this._map = null;
    }
    //
    this._map = new google.maps.Map(document.getElementById( SELECTOR ), _mapOptions);
    //---------------------------------
    // Custom style if selected
    const STYLE = this.mapSettings.customStyle || MapConfig["customStyle"];
    if( STYLE ){
      let _style = this.getCustomStyle(); 
      this._map.setOptions( { styles: _style } );
    } else {
      this._map.setMapTypeId( google.maps.MapTypeId.HYBRID );
    }
    //---------------------------------
    //---------------------------------
    // Switch markers
    if( this.mapMarkers ){
      // Install Legend
      let _g_status = this.getGuidesStatus();
      this.installLegend( this._map, _g_status );
      // Display Markers
      this._markers$ = this.mapMarkers;
      this.mapMarkers.subscribe( ( _markers ) => {
        if( _markers ){
          this.setMarkers( this._map, _markers );
        }
      });
     }else if( this.mapPoints ){
      // Display Points
      this._itinerary$ = this.mapPoints;
      this.mapPoints.subscribe( ( _itinerary ) => {
        if( _itinerary ){
          this.setItinerary( _itinerary );
        }
      });
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
  //---------------------------------- draw_markers_fn
  setMarkers( _map, _markers: any[] ): void {

    _markers.forEach( ( _obj )=>{

      this.place_marker_fn( _map, _obj, this.mapContext );

    });
    
  }
  //----------------------------------
  getGuidesStatus(){
    return {
  		_prep: {
  			id: 0,
  			name: this.language["PREP_GUIDE"],
  			icon:  this.urlRoot + 'assets/images/bullet-preparation.png',
  			shadow: this.urlRoot + 'assets/images/bullet-shadow.png'
  		},
  		_edit: {
  			id: 1,
  			name: this.language["EDITED_GUIDE"],
  			icon: this.urlRoot + 'assets/images/bullet-edite.png',
  			shadow: this.urlRoot + 'assets/images/bullet-shadow.png'
  		},
  		_dec: {
  			id: 2,
  			name: this.language["DISCOVERY_GUIDE"],
  			icon: this.urlRoot + 'assets/images/bullet-decouverte.png',
  			shadow: this.urlRoot + 'assets/images/bullet-shadow.png'
  		}
  	}
  }
  //----------------------------------
  //----------------------------------
  installLegend( _map, _g_status ){
  	let _legend = document.getElementById( 'gmap-legend' );
  	let _h3 = document.createElement('h3');
  	_h3.innerHTML = 'Legende';
  	_legend.appendChild( _h3 );

  	for ( let key in _g_status ) {
  	  let type = _g_status[key];
  	  let name = type.name;
  	  let icon = type.icon;
  	  let _p = document.createElement('p');
  	  _p.innerHTML = '<img src="' + icon + '" alt="' + type + '"> ' + name;
  	  _legend.appendChild( _p );
  	}

    _legend.style.left = '-200px';
  	_map.controls[google.maps.ControlPosition.TOP_LEFT].push( _legend );
    _legend.style.left = '0px';
    _legend.style.display = 'block';
  }
  //----------------------------------
  place_marker_fn( _map, _obj, _context ){

    let _g_status: any = this.getGuidesStatus();
    let _lat_lng = new google.maps.LatLng( parseFloat( _obj.iti_lat ), parseFloat( _obj.iti_lng ) );
    let _type: number = parseInt( _obj.iti_type );
    let _icon_display = null;
    let _arr_objects = _obj.iti_objects.split( ',' );
    let _arr_details = _obj.iti_details;

    switch( _type ){
      case 0:
        _icon_display = _g_status._prep;
        break;
      case 1:
          _icon_display = _g_status._edit;
          break;
        case 2:
          _icon_display = _g_status._dec;
        break;
    };

    let _icon = {
      url: _icon_display.icon, // url
      scaledSize: new google.maps.Size(42.0, 42.0), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(21.0, 21.0) // anchor
    };

    // CREATE MARKER
    let _marker = new google.maps.Marker({
        title: _obj.iti_name,
        position: _lat_lng,
        icon: _icon,
        map: this._map,
        animation: google.maps.Animation.DROP,
        opacity: 0.9
    });

    // INFO BUBBLE
    let _infobubble_HTML = '';
    let _subtitle = '';
    let _cover = '';
    if( _type > 0 ){
    _cover += `<img alt="Blason" src="${this.urlRoot}assets/images/cover-${_obj.id}.jpg" style=" height:110px; vertical-align:middle; margin-right: 0px; float:right" />`;
    }
    if( _obj.iti_description !== '' ){
      _subtitle = `<p>${_obj.iti_description}</p>`;
    }
    _infobubble_HTML += `<div class="GM-info-bulle">
      <h1>${_obj.iti_name}</h1>
      ${_subtitle}
      <h2>${_icon_display.name}</h2>`;
    if( _type > 0 ) {
      _infobubble_HTML += `<p><ion-button id="infoWindowButton-${_obj.id}" class="ion-button gmap-bubble-item-link btn waves-effect waves-light deep-purple"><ion-icon name="walk"></ion-icon> Voir itinéraire</ion-button>`;
      _infobubble_HTML += `<ion-button id="favWindowButton-${_obj.id}" class="ion-button gmap-bubble-item-link btn waves-effect waves-light deep-purple"><ion-icon name="heart"></ion-icon> Favorit</ion-button></p>`;
    }
    _infobubble_HTML += `<hr />`;
      
    _obj.iti_details.forEach( ( _detail )=> {
      _infobubble_HTML += `<p><img alt="${_detail.o_title}" src="${this._urls["blasons_url"]}${_detail.ode_badge}" style=" height:20px; vertical-align:middle; margin-right: 10px;" /><a href="${this._urls["pec_url"]}?p=object&o=${_detail.id}" target="_blank"><b>${_detail.o_title}</b>: voir actions DD</a></p>`;
    });
    _infobubble_HTML += `${_cover }`;
    _infobubble_HTML += `</div>`;

    // Create InfoWindow
    const _infowindow = new google.maps.InfoWindow();
    _infowindow.setContent( _infobubble_HTML );
    
    // LISTENERS
    google.maps.event.addListener( _marker, 'click', ( event ) =>{
      _infowindow.setPosition( event.latLng );
      _infowindow.open( this._map, _marker );
        
        // On open INFOWINDOW
      google.maps.event.addListener( _infowindow, 'domready', function() {
  		
  			// TABS IN INFOWINDOW
  			jQuery( ".GM-info-bulle" ).css( { 'width' : '384px', 'height' : '314px', 'overflow' : 'hidden', 'padding' : '0px' } );
        // On click Button GOTO itinerary
        document.getElementById( `infoWindowButton-${_obj.id}` ).addEventListener("click", () => {
          
          if( typeof( _context.goItinerary ) === 'function' ){
            _context.goItinerary( _obj );
          }

        });
        // On click Button FAVORITE itinerary
        document.getElementById( `favWindowButton-${_obj.id}` ).addEventListener("click", () => {
          
          if( typeof( _context.setFavorit ) === 'function' ){
            _context.setFavorit( _obj );
          }

        });
        // On click Button SHARE itinerary

  		});

      // On close INFOWINDOW go to center of marker
      google.maps.event.addListenerOnce( _infowindow, "closeclick", function(){
        _map.panTo( _marker.getPosition() );
  		});

    });
    
    //this.createPolygons( _type, _arr_objects );
  }
  //----------------------------------
  createPolygons( _type, _arr_objects ){
    if( _arr_objects.length > 0 ){
      
      // Get coordinates of communes
      _arr_objects.forEach( ( _item )=> {

          if( ! this._polygons.includes( _item ) ){

              this._polygons.push( _item );
              this._itiService.loadPolygon( _item, 'coordinates' ).subscribe( ( _json )=>{
                
                if( typeof( _json["polygons"] ) !== 'undefined'  ){
                  this.drawPolygon( this._map, _json["polygons"], _type );
                }else{
                  console.log( 'POLYGON NULL' );
                }
                
              });
          }

      });
      
    }
  }
  //----------------------------------
  drawPolygon( _map, _polygons, _type ){

    console.log( 'POLYGON DRAW', _type );

    let _POLYGONS = _polygons;
		let _ID = _POLYGONS[ 0 ].ID;

    let _color = '#DD78EC';

    if( _type === 0 ){
			_color = '#efb029';
		} else if( _type === 2 ){
			_color = '#214f6b';
		}

    for ( let _i = 0; _i < _POLYGONS.length; _i++ ) {

			let _objPoly = _POLYGONS[ _i ];
			let _lineColor = _objPoly.strockeColor.toUpperCase();
			let _lineOpacity = _objPoly.strockeOpacity;
			let _lineWeight = _objPoly.strockeWeight;
			let _fillColor  = _color; //_objPoly.fillColor.toUpperCase();
			let _fillOpacity  = _objPoly.fillOpacity;
			let _path  = eval( _objPoly.paths );

			let _polygon = new google.maps.Polygon({
				//path: _path,
				strokeColor: _lineColor,
				strokeOpacity: _lineOpacity,
				strokeWeight: _lineWeight,
				fillColor: _fillColor,
				fillOpacity: _fillOpacity
			});

			_polygon.setMap( _map );

		}

  }
  //----------------------------------
  //----------------------------------
  //----------------------------------
  // POINTS
  //----------------------------------
  //----------------------------------
  //----------------------------------
  getLatLng( _iti ): object{
    return new google.maps.LatLng( _iti.iti_lat, _iti.iti_lng );
  }
  //----------------------------------
  coordsToLatLngs( _array ): Array<any>{

    let _path = [];

    jQuery.each( _array, ( _i, _obj )=>{
      var _arr_temp = _obj.split(',');
      var _lat = parseFloat( _arr_temp[ 0 ] );
      var _lng = parseFloat( _arr_temp[ 1 ] );
      if( ( isNaN( _lat ) === false ) && ( isNaN( _lng ) === false ) )
      {
        _path.push( new google.maps.LatLng( _lat, _lng ) );
      };
    });

    return _path;
  }
  //----------------------------------
    getTypesPoints( _markers ){

    let _datas = _markers.datas;
    let _types_opt = new Array(
      { 'container': 'list-objects', 'color': 'green', 'title': this.language['OBJECTS'], 'datas': new Array() },
      { 'container': 'list-themes', 'color': 'blue', 'title': this.language['THEMES'], 'datas': new Array() },
      { 'container': 'list-encadres', 'color': 'gray', 'title': this.language['FOCUS'], 'datas': new Array() }
    );

    _datas.forEach( ( _obj, _i )=> {

      let _typ = parseInt( _obj.imk_type );
      if( _typ < _types_opt.length ){
        _types_opt[ _typ ].datas.push( _obj );
      }

    });

    return _types_opt;

  }
  //----------------------------------
  installPointsLegend( _map, _coords, _shortcut ){
    let _legend = document.getElementById( 'gmap-legend' );
    let _h3 = document.createElement('h3');
    _h3.innerHTML = this.language['RGSMAP_LEGEND'];
    _legend.appendChild( _h3 );

    if( typeof( _coords ) === 'object' ){
      let _p = document.createElement('p');
      _p.innerHTML = '<span style="background:' + _coords.ico_strokeColor + ';">&nbsp;</span> ' + this.language['RGSMAP_ITINERARY'];
      _legend.appendChild( _p );
    }

    _legend.style.left = '-200px';
  	_map.controls[google.maps.ControlPosition.TOP_LEFT].push( _legend );
    _legend.style.left = '0px';
    _legend.style.display = 'block';

  }
  //----------------------------------
  displayMainArea( _map, _coords ): void{
    if( typeof( _coords ) !== 'undefined' ){

      let _reg = /\r\n/gi;
      let _str_coords = _coords.ico_coordinates;
      _str_coords = _str_coords.replace( _reg, '' );
      let _arr_coords = _str_coords.split(';');
      let _stroke_color = _coords.ico_strokeColor;
      let _stroke_opacity = parseFloat( _coords.ico_strokeOpacity );
      let _stroke_weight = parseInt( _coords.ico_strokeWeight );

      if( _stroke_color === '' ){
        _stroke_color = '#000000';
      }
      if( typeof( _coords.ico_strokeOpacity ) === 'undefined' ){
        _stroke_opacity = 1.0;
      }
      if( _stroke_weight == 0 ){
        _stroke_weight = 1;
      }

      // Display
      let _parcoursPath = new google.maps.Polyline({
        path: this.coordsToLatLngs( _arr_coords ),
        strokeColor: _stroke_color,
        strokeOpacity: _stroke_opacity,
        strokeWeight: _stroke_weight,
        visible: true,
        clickable: false,
        zIndex: 1,
        map: _map
      });

    };
  }
  //----------------------------------
  displayShortcutAreas( _map, _id, _shortcuts ): void {
    
    let _arrShortcuts = _shortcuts.datas
    let _reg = /\r\n/gi;
    //
    for (let _obj of _arrShortcuts) {
      
      if( _id === _obj.ish_itineraire_ID ){
        let _strCoords = _obj.ish_coordinates;
        _strCoords = _strCoords.replace( _reg, '' );
        let _arrCoord = _strCoords.split(';');
        let _strokeColor = _obj.ish_strokeColor;
        let _strokeOpacity = parseFloat( _obj.ish_strokeOpacity );
        let _strokeWeight = parseInt( _obj.ish_strokeWeight );

        if( _strokeColor ==='' ){ _strokeColor = '#000000'; }
        if( typeof( _obj.ish_strokeOpacity ) === 'undefined' ) { _strokeOpacity = 1.0; }
        if( _strokeWeight === 0 ) { _strokeWeight = 1; }
      
        // Display
        let _parcoursPath = new google.maps.Polyline({
          path: this.coordsToLatLngs( _arrCoord ),
          strokeColor: _strokeColor,
          strokeOpacity: _strokeOpacity,
          strokeWeight: _strokeWeight,
          visible: true,
          clickable: false,
          zIndex: 1,
          map: _map
        });

        if( _obj.ish_title !== '' ){

          let _legend = document.getElementById('gmap-legend');
          let _p = document.createElement('p');
          _p.innerHTML = '<span style="background:'+ _strokeColor +';">&nbsp;</span> '+ _obj.ish_title ;
          _legend.appendChild( _p );
        }
      }

    };
    //
  }
  //----------------------------------
  setPoint( _point, _data ): void{
    let _urlIcons = this._urls["cdn_img_url"] + 'gmaps/';
    let _thisIconActive = _urlIcons + 'active/' + _data.imk_iconActive
    // _oldPoint

    if( this._oldPoint !== null )  {
      // Clear old selection
      this._oldPoint.setIcon( this._oldIconPoint );
      this._oldPoint = null;
      this._oldIconPoint = null;
    }

    // Save new selection
    this._oldPoint = _point;
    this._oldIconPoint = _point.getIcon();

    let _icon = {
      url: _thisIconActive, // url
      scaledSize: new google.maps.Size(16, 16), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(8, 8) // anchor
    };

    _point.setIcon( _icon );
    
  }
  //----------------------------------
  addPoint( _map, _data, _color, _cpt ){
    //
    //console.log( 'DATA', _data );

    let _urlIcons = this._urls["cdn_img_url"] + 'gmaps/';
    let _the_point = new google.maps.LatLng( _data.imk_lat, _data.imk_lng );

    let _icon = {
      url: _urlIcons + _color + '/' + _data.imk_icon, // url
      scaledSize: new google.maps.Size(16, 16), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(8, 8) // anchor
    };
    let _the_shape = {
      coord: [11,0,13,1,14,2,14,3,15,4,15,5,15,6,15,7,15,8,15,9,15,10,15,11,15,12,15,13,15,14,15,15,0,15,0,14,0,13,1,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,1,3,1,2,2,1,4,0,11,0],
      type: 'poly'
    };

    let _the_marker = new google.maps.Marker({
      position: _the_point,
      map: _map,
      icon: _icon,
      shape: _the_shape,
      title: _data.imk_title,
      //label: "",
      opacity: 0.9,
      zIndex: parseInt( _data.imk_index_Z )
    });

    // Gestion du clic sur le marqueur, mise à jour de l'affichage
    google.maps.event.addListener( _the_marker, 'click', ( _e )=> {

      this.setPoint( _the_marker, _data );
      if( typeof( this.mapContext.onPoint ) === 'function' ){
        this.mapContext.onPoint( _data );
      }
    });
  }
  //----------------------------------
  displayPoints( _map, _points ): void{

    let _types = this.  getTypesPoints( _points );

    _types.forEach( ( _obj, _i )=> {

      let _arrDatas = _obj.datas;

      if( _arrDatas.length > 0 ){
        let _cpt = 0;
        _arrDatas.forEach( ( _data, _i2 )=> {

          // ADD POINT
          this.addPoint( _map, _data, _obj.color, _cpt );
          _cpt++;
        });

      };

    });
    //
  }
  //----------------------------------
  //setItinerary( _itinerary: IItinerary ): void {
  setItinerary( _itinerary ): void {
    //
    let _iti = _itinerary.Itinerary;
    let _page = _itinerary.ItineraryPage;
    let _coords = _itinerary.ItineraryCoordinates;
    let _shortcut = _itinerary.ItineraryShortcut;
    let _markers = _itinerary.ItineraryMarkers;

    console.log( 'CHECK ITI:::', _itinerary);

    // Set LatLng
    let _latLng: object = new google.maps.LatLng( _iti.iti_lat, _iti.iti_lng );
    let _zoom: number = parseInt( _iti.iti_zoom );

    this._map.panTo(_latLng);
    this._map.setZoom( _zoom );

    // Install Legend
    this.installPointsLegend( this._map, _coords, _shortcut );

    //----- Display polygons
    this.displayMainArea( this._map, _coords );
    this.displayShortcutAreas( this._map, _iti.id, _shortcut);

    //----- Display markers
    this.displayPoints( this._map, _markers );
  };
  //----------------------------------
  //----------------------------------
  //----------------------------------
  //----------------------------------
  //----------------------------------
  //----------------------------------
  //----------------------------------
  //----------------------------------
  //----------------------------------
}