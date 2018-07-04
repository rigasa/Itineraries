import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
//--------------------
import { IItineraries } from '../../../../models/itineraries.model';
import { ItinerariesService } from '../../../../shared/services/itineraries/itineraries.service';
import { IMapConfig } from '../../../../shared/components/map/map.config.interface';
import { ConfigService } from '../../../../shared/services/config/config.service';
//--------------------
@Component({
  selector: 'app-home-map',
  templateUrl: './home-map.component.html',
  styleUrls: ['./home-map.component.scss']
  //encapsulation: ViewEncapsulation.None
})
export class HomeMapComponent implements OnInit {

  public itineraries$: Observable<any[]>;

  public defaultSettings: IMapConfig = {
    latitude: 46.2587, 
    longitude: 6.11938, 
    zoom: 11, 
    customStyle: true,
    markers: []
  };
  public pageTitle: string;
  
  constructor( 
    private _router: Router,
    private _itiService: ItinerariesService,
    private _config: ConfigService
  ) { }

  ngOnInit() {
    this._itiService.loadItineraries().subscribe( itis => {
      this.defaultSettings.markers =  itis;
    });
    this._config.getCurLanguage().then( ( val ) => {
      this.pageTitle = val.CHOICE_ITINERARY;
    });
    
  }

  goItinerary( itinerary: IItineraries ): void {
    //console.log('::: Go to itinerary', itinerary );
    this._router.navigate(['itinerary', itinerary.id ] );
  }

  setFavorit( itinerary: IItineraries ): void {
    console.log('::: Save Favorit', itinerary );
  }

}
