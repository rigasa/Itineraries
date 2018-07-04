import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { ItinerariesService } from '../../services/itineraries/itineraries.service';
import { FavoritesService } from '../../services/favorites/favorites.service';
//--------------------
import { ActivatedRoute } from '@angular/router';
//--------------------

@Component({
  selector: 'app-itinerary-points',
  templateUrl: './itinerary-points.component.html',
  styleUrls: ['./itinerary-points.component.scss']
  //encapsulation: ViewEncapsulation.None
})
export class ItineraryPointsComponent implements OnInit {

  public itinerary$: Observable<any>;
  
  @Input() focus: { itinerary: number, point: number };

  constructor(
    private _itiService: ItinerariesService,
    private _fav: FavoritesService
  ) { }

  ngOnInit() {
    const ITEMS = {itinerary: this.focus.itinerary, point: this.focus.point};

  }

}
