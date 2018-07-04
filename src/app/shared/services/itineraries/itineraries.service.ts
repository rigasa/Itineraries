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
    
    return this._http.post( 'asddWS', getParams, {} ).pipe(
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
    
    return this._http.post( 'asddWS', getParams, {} ).pipe(
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
  //--------------------
}
