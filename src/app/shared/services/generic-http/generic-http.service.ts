import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  public apiEndpoint: {} = {
    asddWS: 'http://genevedurable.ch/ws/web-services.php',
    asddPECWS: 'http://genevedurable.ch/PEC-ADM/ws/web-services.php',
    server: 'https://fierce-savannah-90177.herokuapp.com/'
  };

  constructor(private _httpClient: HttpClient) { }

  get( api: 'asddWS'|'asddPECWS'|'server'|'other', path: string = null, isAuth: boolean = false ): Observable<any> {
    if (!this.apiEndpoint[api]) {
      return of(new Error('API Endpoint do not exist.'));
    }
    // Access-Control-Allow-Origin
    let httpOptions;

    if( api === 'server' ){
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:4200' }),
        mode: 'cors'
      };
    } else{
      httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        mode: 'no-cors'
      };
    }
  
    let result =this._httpClient.get(`${this.apiEndpoint[api]}${(path) ? `${path}` : ``}`, httpOptions).pipe(
      map(res => res || {}),
      catchError((err: Error) => of(new Error(`${err.message || `Unable to request service API.`}`)))
    );
    
    return result;
  }
  //-----------------------------
  post( api: 'asddWS'|'asddPECWS'|'server'|'other', path: string = null, postedData: Object = {}, isAuth: boolean = false ): Observable<any> {

   const httpOptions = {
      //method: 'POST',
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      //mode: 'no-cors'
    };

    if ( ! this.apiEndpoint[api] ) {
      return of( new Error( 'API Endpoint do not exist.' ) );
    }

    return this._httpClient.post(`${this.apiEndpoint[api]}${(path) ? `${path}` : ``}`, postedData, httpOptions )
    .pipe(
      map(res => res || {}),
      catchError((err: Error) => of(new Error(`${err.message || `Unable to request service API.`}`)))
    );
  }

}