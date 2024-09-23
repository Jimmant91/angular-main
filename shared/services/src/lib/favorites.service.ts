import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class FavoritesService {

    private favorites: Set<number> = new Set();
    private favoritesSubject = new BehaviorSubject<Set<number>>(this.favorites);

    constructor (private localStorageService: LocalStorageService) {

        this.loadFavorites();

    }

    private loadFavorites (): void {

        const storedFavorites = this.localStorageService.getItem('favorites');
        if (storedFavorites) {

            this.favorites = new Set(JSON.parse(storedFavorites));
            this.favoritesSubject.next(this.favorites);

        }

    }

    private saveFavorites (): void {

        this.localStorageService.setItem('favorites', JSON.stringify(Array.from(this.favorites)));

    }

    toggleFavorite (userId: number): void {

        if (this.favorites.has(userId)) {

            this.favorites.delete(userId);

        } else {

            this.favorites.add(userId);

        }
        this.saveFavorites();
        this.favoritesSubject.next(this.favorites);

    }

    isFavorite (userId: number): boolean {

        return this.favorites.has(userId);

    }

    getFavorites (): Observable<Set<number>> {

        return this.favoritesSubject.asObservable();

    }

}
