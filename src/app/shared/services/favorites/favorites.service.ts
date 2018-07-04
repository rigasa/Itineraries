// https://ionicacademy.com/store-data-inside-ionic/
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
 
const STORAGE_FAVORITES_KEY = 'getFavoriteItems';
 
@Injectable()
export class FavoritesService {
 
  constructor(public storage: Storage) { }
 
  isFavorite(favoriteId) {
    return this.getAllFavorites().then(result => {
      return result && result.indexOf(favoriteId) !== -1;
    });
  }
 
  setFavoriteItem(favoriteId) {
    return this.getAllFavorites().then(result => {
      if (result) {
        result.push(favoriteId);
        return this.storage.set(STORAGE_FAVORITES_KEY, result);
      } else {
        return this.storage.set(STORAGE_FAVORITES_KEY, [favoriteId]);
      }
    });
  }
 
  unFavoriteItem(favoriteId) {
    return this.getAllFavorites().then(result => {
      if (result) {
        var index = result.indexOf(favoriteId);
        result.splice(index, 1);
        return this.storage.set(STORAGE_FAVORITES_KEY, result);
      }
    });
  }
 
  getAllFavorites() {
    return this.storage.get(STORAGE_FAVORITES_KEY);
  }
 
}