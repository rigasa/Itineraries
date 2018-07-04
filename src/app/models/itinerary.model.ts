import { IItineraryCoordinates } from './itinerary-coordinates.model';
import { IItineraryShortcut } from './itinerary-shortcut.model';
import { IItineraryPage } from './itinerary-page.model';
import { IItineraryMarkers } from './itinerary-markers.model';

export interface IItinerary {
  Itinerary?: {
    id?: number,
    iti_lat?: number,
    iti_lng?: number,
    iti_zoom?: number,
    iti_name?: string,
    iti_description?: string,
    iti_created?: Date,
    iti_modified?: Date,
    iti_objects?: string,
    iti_lang?: string,
    iti_type?: string,
    iti_flickr?: string,
    iti_color?: string,
    iti_details?: Array<{
      id: number,
      o_title: string,
      ode_website: string,
      ode_badge: string
    }>
  },
  ItineraryCoordinates?: IItineraryCoordinates,
  ItineraryMarkers?: {
      total?: number,
      datas?: Array<IItineraryMarkers>
  },
  ItineraryPage?: IItineraryPage,
  ItineraryShortcut?: {
      total?: number,
      datas?: Array<IItineraryShortcut>
  }
};