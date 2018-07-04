import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenericHttpService {

  public apiEndpoint: {} = {
    asddWS: 'http://www.genevedurable.ch/ws/web-services.php'
  };

  constructor(private _httpClient: HttpClient) { }

  get( api: 'asddWS'|'other', path: string = null ): Observable<any> {
    if (!this.apiEndpoint[api]) {
      return of(new Error('API Endpoint do not exist.'));
    }
    return this._httpClient.get(`${this.apiEndpoint[api]}${(path) ? `${path}` : ``}`).pipe(
      map(res => res || {}),
      catchError((err: Error) => of(new Error(`${err.message || `Unable to request service API.`}`)))
    );
  }
  //-----------------------------
  post( api: 'asddWS'|'other', path: string = null, postedData: Object = {} ): Observable<any> {

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