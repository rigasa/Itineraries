import { Injectable } from '@angular/core';
//--------------------
import { GenericHttpService } from '../generic-http/generic-http.service';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
//--------------------
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../../../models/user.model';
//--------------------
@Injectable({
  providedIn: 'root'
})
/*export class UsersService extends GenericHttpService {

  constructor(private _http: HttpClient) {
    super( _http );
  }*/
export class UsersService {

  public curUser: IUser;

  constructor(
    private _http: GenericHttpService,
    private _storage: StorageService
  ) { 
 /* let _user = {
      "_id": {
          "$oid": "5b3f2347881bf30023125643"
      },
      "name": "rigasa",
      "role": "superadmin",
      "created": {
          "$date": "2018-07-05T10:02:00.000Z"
      },
      "modified": {
          "$date": "2018-07-05T10:02:00.000Z"
      },
      "lang": "fr-FR",
    "prefs": {
        "firebase": {
            "apiKey": "AIzaSyCZ9kZEEgcEKDDuUoDSzsGMCu05cvqelqU",
            "authDomain": "asdd-acadf.firebaseapp.com",
            "databaseURL": "https://asdd-acadf.firebaseio.com",
            "projectId": "asdd-acadf",
            "storageBucket": "asdd-acadf.appspot.com",
            "messagingSenderId": "429322806770"
        },
        "paths": {
            "root_url": "http://www.genevedurable.ch/guides/wp-content/themes/guides/",
            "ws_url": "http://www.genevedurable.ch/ws/web-services.php",
            "pec_url": "http://genevedurable.ch/PEC/",
            "cdn_url": "http://code.genevedurable.ch/latest/",
            "cdn_img_url": "http://code.genevedurable.ch/latest/assets/images/",
            "cdn_photos_url": "http://code.genevedurable.ch/latest/assets/itineraires/img/",
            "cdn_odd_img_url": "http://code.genevedurable.ch/latest/assets/itineraires/assets/ODD/img/",
            "gmaps_url": "https://maps.googleapis.com/maps/api/js?v=3.exp",
            "blasons_url": "http://code.genevedurable.ch/latest/assets/images/blasons/thumbs-35/"
        },
        "gmaps": {
            "lat": 46.2587,
            "lng": 6.11938,
            "zoom": 11
        },
        "slideshow": {
            "control_speed": 500,
            "slideshow_speed": 5000
        }
    },
      "__v": 0
    }
    
    this._storage.set('user', 'login', _user ).then( (result )=>{
console.log( 'USER VALUE::', result );
    });*/
    
    /*this._storage.get('user', 'login' ).then( (result )=>{
      console.log( 'GET USER VALUE::', result);
      this.curUser = result;

      console.log( 'USER CONNECTED::', this.isConnected() );

    });*/
    this.initConnexion();
     
  }
  //--------------------
  // CONNEXION
  //--------------------
  public async initConnexion(){
    /*this.getUsers().subscribe( (users )=>{
      console.log('GET USERS:::', users );
    });*/
    this.curUser = null;

    await this._storage.get( 'user', 'login' ).then( (result )=>{
      if( ! result ){
        //console.log('NOT STORAGE USER' );
        //----
        let _cur = this.getUser( "5b3f2347881bf30023125643" );

        _cur.then( ( result$: any )=>{

          result$.subscribe( ( current )=>{
          
            if( ! current ){
             // console.log('GET USER CURRENT NULL' );
            }else{
              //console.log('GET USER CURRENT:::', current );
            }
            this.initConnexion(); // Relaunch for fix

            //console.log('USER CONNECTED:::', this.curUser );

          });
        });
        //----
      }else{
        this.curUser = result;
        //console.log('GET USER STORED:::', this.curUser );
      }
      //
    });
  }
  //--------------------
  // USERS
  //--------------------
  getUsers(): Observable<any[]> {
    //
    const getParams = `api/users`;
    
    return this._http.get( 'server', getParams ).pipe(
      map( value => {
        if ( value ) {
          return value;
        }else{
          return [];
        };
        
      })
    );
  }
  //--------------------
  // USER
  //--------------------
  private async storeUser( user:IUser ){
    let _greetingPromise = await this._storage.set('user', 'login', user );

    /*console.log( 'STORE USER AWAIT:::', _greetingPromise );
    _greetingPromise.then(function(resolveOutput) {
      console.log('RESOLVE', resolveOutput);
      return resolveOutput;
    }, function(rejectOutput) {
      console.log('REJECT', rejectOutput);
      return null;
    });*/
    return _greetingPromise;
  }
  //--------------------
  public async getUser( id ) {
    //
    const getParams = `api/users/${id}`;
    
    return await this._http.get( 'server', getParams ).pipe(
      map( user => {
        if ( user ) {
            if( user.name === 'Error' ){
              this.curUser = null;
              //console.log(':::GET USER ERROR:::' );
              return null;
            }else{
              //console.log(':::GET USER STORE:::' );
              let _stored = this.storeUser( user );
              _stored.then( ( _storeduser )=>{
                //console.log(':::STORED USER:::', _storeduser );
                this.curUser = _storeduser;
                return _storeduser;
              });
            }
        }else{
          this.curUser = null;
          //console.log(':::GET USER NULL:::' );
          return { error: 'Not user value'};
        };
      })
    );
  }
  //--------------------
  isConnected(){
    return ( typeof( this.curUser ) !== 'undefined' );
  }
  //--------------------
  getCurUser() :IUser {
    return this.curUser;
  }
  //--------------------
  getCurUserId(): string{
    return this.getCurUser()._id["$oid"];
  }
  //--------------------
  userLogin() {
    console.log('USER LOGIN:::' );
  }
  //--------------------
  userDeconnect() {
    console.log('DECONNECT:::' );
  }
  //--------------------
  userCreate() {
    console.log('CREATE:::' );
  }
  //--------------------------------
  openLoginUser(){
    console.log('OPEN LOGIN USER'  );
  }
   // https://forum.ionicframework.com/t/handling-server-authentication/89357
   /*login(credentials) {
    let username: string = 'anonymous';
    let password: string = '1234';
    let headers: Headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return this._http.post('http://testapi.com/resource/json', loginServiceData, { headers: headers })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let reply = response.json();
        let valid = false;
        let comment = "";
        if (reply) {
          if (reply.error === 0) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            valid = true;
          }
          else {
            comment = reply.message;
          }

          return { valid: reply.valid, comment: reply.comment };
        }
    });
  }*/

}
