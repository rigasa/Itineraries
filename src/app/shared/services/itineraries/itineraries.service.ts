import { Injectable } from '@angular/core';
//--------------------
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//--------------------
import { GenericHttpService } from '../generic-http/generic-http.service';
//--------------------
import { IItineraries } from '../../../models/itineraries.model';
//--------------------
@Injectable({
  providedIn: 'root'
})
//--------------------
export class ItinerariesService {
  //-------------------
  public itineraries: IItineraries[];
  //-------------------
  constructor( 
    private _http: GenericHttpService,
  ) {
    //console.log( 'APP CONFIG:: ', this.appLanguage );
   }
  //--------------------
  // ITINERARIES
  //--------------------
  loadItineraries(): Observable<any[]> {
    //
    const getParams = "?ws-service=itinerary&ws-action=get_itineraries";
    
    return this._http.get( 'asddWS', getParams ).pipe(
      map( value => {
        if (value.SUCCESS ) return value.SUCCESS.datas;
        return [];
      })
    );
  }
  //--------------------
  // ITINERARY
  //--------------------
  loadItinerary( itiId: number, itiPart: string = '' ): Observable<any[]> {
    //
    const getParams = `?ws-service=itinerary&ws-action=get_itinerary&ws-item=${itiId}`;
    
    return this._http.get( 'asddWS', getParams ).pipe(
      map( value => {
        if ( value.SUCCESS ) {
          //console.log( 'ITI::', value.SUCCESS );
          let _val: object = value.SUCCESS;
          
          switch( itiPart ){
            case 'Itinerary':
              if( typeof( value.SUCCESS.Itinerary ) !== 'undefined'){
                _val = value.SUCCESS.Itinerary;
              };
              break;
            
            case 'ItineraryCoordinates':
              if( typeof( value.SUCCESS.ItineraryCoordinates ) !== 'undefined'){
                return value.SUCCESS.ItineraryCoordinates;
              };
              break;
            
            case 'ItineraryMarkers':
                // ItineraryMarkers.datas
                if( typeof( value.SUCCESS.ItineraryMarkers.datas ) !== 'undefined'){
                  _val = value.SUCCESS.ItineraryMarkers.datas;
                };
                break;
            
            case 'ItineraryPage':
              if( typeof( value.SUCCESS.ItineraryPage ) !== 'undefined'){
                _val = value.SUCCESS.ItineraryPage;
              };
              break;
            
            case 'ItineraryShortcut':
                // ItineraryShortcut.datas
                if( typeof( value.SUCCESS.ItineraryShortcut.datas ) !== 'undefined'){
                  return value.SUCCESS.ItineraryShortcut.datas;
                };
          };
          return _val;

        }else{
          return [];
        };
        
      })
    );
  }
  //--------------------
  // POINT
  //--------------------
  loadPoint( pointId: number, itiPart: string = ''): Observable<any[]>{

    const getParams = `?ws-service=itinerary&ws-action=get_marker&ws-item=${pointId}`;

    let _res = this._http.get( 'asddWS', getParams ).pipe(
      map( value => {
        if ( value.SUCCESS ) {
          let _val: object = value.SUCCESS;

          //console.log( 'POINT LOADED::', _val );
          
          switch( itiPart ){
            case 'Files':
              if( typeof( value.SUCCESS.Files ) !== 'undefined'){
                return value.SUCCESS.Files;
              };
              break;
            
            case 'Marker':
              if( typeof( value.SUCCESS.Marker ) !== 'undefined'){
                return value.SUCCESS.Marker;
              };
              break;
            
            case 'Page':
                if( typeof( value.SUCCESS.Page ) !== 'undefined'){
                  return value.SUCCESS.Page;
                };
          };
          return value.SUCCESS ;

        }else{
          return [];
        };
        
      })
    );

    return _res;
  }
  //--------------------
  // POLYGONS
  //--------------------
  loadPolygon( _id: any, itiPart: string = '' ): Observable<any[]> {
    //
    const getParams = "?ws-service=frontend&ws-action=obj_get_record&id=" + _id;
    
    return this._http.get( 'asddPECWS', getParams ).pipe(
      map( value => {
        if ( value.SUCCESS ) {
          //console.log( 'asddPECWS', value.SUCCESS );
          switch( itiPart ){
            case 'banner':
              if( typeof( value.SUCCESS.banner ) !== 'undefined'){
                return value.SUCCESS.banner;
              };
              break;
            case 'contacts':
                if( typeof( value.SUCCESS.contacts ) !== 'undefined'){
                  return value.SUCCESS.contacts;
                };
                break;
            case 'coordinates':
                if( typeof( value.SUCCESS.coordinates ) !== 'undefined'){
                  return value.SUCCESS.coordinates;
                };
                break;
            case 'details':
                if( typeof( value.SUCCESS.details ) !== 'undefined'){
                  return value.SUCCESS.details;
                };
                break;
            case 'domains':
                if( typeof( value.SUCCESS.domains ) !== 'undefined'){
                  return value.SUCCESS.domains;
                };
                break;
            case 'coordinates':
                if( typeof( value.SUCCESS.object ) !== 'undefined'){
                 return value.SUCCESS.object;
                };
                break;
            default:
              return value.SUCCESS;
          };
          
          
        }
        return [];
      })
    );
  }
  //--------------------
  //--------------------
}
