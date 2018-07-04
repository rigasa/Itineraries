import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
//--------------------
import { IItineraries } from '../../../../models/itineraries.model';
import { ItinerariesService } from '../../../../shared/services/itineraries/itineraries.service';
import { FavoritesService } from '../../../../shared/services/favorites/favorites.service';
import { ConfigService } from '../../../../shared/services/config/config.service';
//--------------------
@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.scss']
  //encapsulation: ViewEncapsulation.None
})
//--------------------
export class HomeListComponent implements OnInit {

  public itineraries$: Observable<any[]>;
  public pageTitle: string;

  constructor( 
    private _router: Router,
    private _itiService: ItinerariesService,
    private _config: ConfigService,
    private _fav: FavoritesService
  ) { }

  ngOnInit() {
    this.itineraries$ = this._itiService.loadItineraries();
    this._config.getCurLanguage().then( ( val ) => {
      this.pageTitle = val.CHOICE_ITINERARY;
    });


  }

  goItinerary( itinerary: IItineraries ): void {
    this._router.navigate(['itinerary', itinerary.id ] );
  }

  setFavorit( itinerary: IItineraries ): void {
    const _link = {
      link: 'http://localhost:4200/itinerary/' + itinerary.id,
      name: itinerary.iti_name
    }
    //
    this._fav.setFavoriteItem( _link ).then(() => {
      console.log('::: Save Favorit', _link );
      //this.isFavorite = true;
    });

  }

  shareFavorite( itinerary: IItineraries ) {
    /*let email = {
      to: 'saimon@devdactic.com',
      subject: 'I love this one: ' + itinerary.iti_name,
      body: 'Can you remember the opening?<br><br>\"' + this.film.opening_crawl + '\"',
      isHtml: true
    };
 
    this.emailComposer.open(email);*/
  }

}
//--------------------